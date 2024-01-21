import { Carousel, CarouselImage, CarouselItem } from "./components/carousel";
import "./globals.css";
import { Movie } from "./models/movie";

async function getMovies(search: string, amount: number = 10) {
  const fetches = [];
  for (let i = 1; i <= Math.ceil(amount / 10); i++) {
    fetches.push(
      fetch(
        `${process.env.OMDB_URL}?apiKey=${process.env.OMDB_API_KEY}&s=${search}&page=${i}`
      ).then((resp) => resp.json())
    );
  }

  const data = await Promise.all(fetches);

  const movies: Movie[] = data
    .flatMap((d) => d.Search)
    .map((movie: { Title: string; imdbID: string; Poster: string }) => ({
      id: movie.imdbID,
      title: movie.Title,
      imageUrl: movie.Poster,
    }));
  return movies;
}

export default async function Home() {
  const movies = await getMovies("love", 30);

  return (
    <main className="min-h-screen py-24">
      <h2 className="text-4xl ml-6">Love is in the air!</h2>
      <Carousel>
        {movies?.map((movie) => (
          <CarouselItem key={movie.id}>
            <CarouselImage
              src={movie.imageUrl}
              alt={`poster for ${movie.title}`}
            />
            <h2 className="text-md pt-3">{movie.title}</h2>
          </CarouselItem>
        ))}
      </Carousel>
    </main>
  );
}
