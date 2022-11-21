import { Button } from '@mui/material';
import DentistCard from '../components/DentistCard';
import clinic from '../images/elegant-clinic.jpg';
import '../styles/HomePage.css';


function HomePage() {
    const buttonText = "Press me";
    const dentists = [
        {name: "Dentist 1", details: "08.00 to 17:00 Monday to Friday", id: "1", location: "Lindholmen"}, 
        {name: "Dentist 2"}, 
        {name: "Dentist 3"}, 
        {name: "Dentist 4"},
        {name: "Dentist 5"}]

    return (
    <div>
        <div className='main-container'>
            <div className="top-div">
                <h1 className="dentist-heading"> Dentismo </h1>
            </div>
            <div className='home-image-holder'>
                <div className='text-button-holder'>
                    <div className='text-holder'>
                        <span>Every dental experience personalized to you.</span>
                    </div>
                    <div className='button-holder'>
                        <Button className="dentist-button" variant="outlined"> See available dentist</Button>
                    </div>
                </div>
                <div className='image-holder'>
                    <img src={clinic} alt="" />
                </div>
            </div>
            <div className="banner-below-image">
                <div>
                    <h2 className='banner-text'>Dentismo is a web-service based in Gothenburg, to provide available dentist to customers.</h2>
                </div>
            </div>
            <div className="available-dentist">
                <p>Available Dentists:</p>
            </div>
            <div id='card-section' className={dentists.length > 3 && dentists.length !== 5 ? 'dentist-cards' : "alt-dentist-cards"}>
            {dentists.map(dentist => <DentistCard dentist={dentist} key={dentist.name}></DentistCard>)}
            </div>
            
        </div>
    </div>
    );
}

export default HomePage;