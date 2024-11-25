import LandingPage from "@/components/LandingPage/LandingPage";
import SearchBar from "@/components/SearchBar/SearchBar";
import PropertyTiles from "@/components/PropertyTiles/PropertyTiles";

const HomeContent = () => {
    return (
        <>
            <LandingPage />
            <SearchBar />
            <PropertyTiles />
        </>
    );
};

export default HomeContent;
