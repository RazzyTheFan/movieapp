import MovieCard from "../components/Moviecard"
import { useEffect, useState } from "react" //a hook
import "../css/Home.css"
import { searchMovies, getPopularMovies } from "../../services/api";

function Home(){ //Displaying entire layout of homepage
   const [searchQuery, setSearchQuery] = useState(""); //must be const or else lost on rerender
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            }
            catch (err) {
                console.log(err);
                setError("Failed to load movies...");
            }
            finally {
                setLoading(false);
            }
        }

        loadPopularMovies();
    },[]) //if empty only run once at first render

    // const movies = [
    //     {id: 1, title: "John Wick", releasedate: "2020"},
    //     {id: 2, title: "Terminator", releasedate: "1999"},
    //     {id: 3, title: "The matrix", releasedate: "2023"},
    // ];

    const handleSearch = async (e) => 
        { 
            e.preventDefault();
            if (!searchQuery.trim()) return
            if (loading) return

            setLoading(true)

            try {
                const searchResults = await searchMovies(searchQuery)
                setMovies(searchResults)
                setError(null)
            } catch (err) {
                console.log(err)
                setError("Failed to load movies...")
            } finally{
                setLoading(false);
            }

            // alert(searchQuery)
            // setSearchQuery("")
        };

    return(
     <div className="Home">

        <form onSubmit={handleSearch} className="search-form">
            <input 
                type="text" 
                placeholder="Search for movies..." 
                className="search-input" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">Search</button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
            <div className="loading">Loading...</div>
        ) : (
            <div className="movies-grid">
            {movies.map ((movie) => 
            movie.title.toLowerCase().startsWith(searchQuery) && (<MovieCard movie={movie} key={movie.id}/>
            ) ) }
            </div>
        )
        }

        
     </div>
    );
}

export default Home
