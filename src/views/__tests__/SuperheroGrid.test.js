import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SuperheroGridView from '../SuperheroGrid';
import '@testing-library/jest-dom';

describe('SuperheroGridView', () => {
    const mockSuperheroes = [
        {
            id: '644',
            name: 'Superman',
            powerstats: {
            intelligence: '94',
            strength: '100',
            speed: '100',
            durability: '100',
            power: '100',
            combat: '85',
            },
            biography: {
            'full-name': 'Clark Kent',
            'alter-egos': 'Superman Prime One-Million',
            aliases: [
                'Clark Joseph Kent',
                'The Man of Steel',
                'the Man of Tomorrow',
                'the Last Son of Krypton',
                'Big Blue',
                'the Metropolis Marvel',
                'the Action Ace',
            ],
            'place-of-birth': 'Krypton',
            'first-appearance': 'ACTION COMICS #1',
            publisher: 'Superman Prime One-Million',
            alignment: 'good',
            },
            appearance: {
            gender: 'Male',
            race: 'Kryptonian',
            height: ["6'3", '191 cm'],
            weight: ['225 lb', '101 kg'],
            'eye-color': 'Blue',
            'hair-color': 'Black',
            },
            work: {
            occupation: 'Reporter for the Daily Planet and novelist',
            base: 'Metropolis',
            },
            connections: {
            'group-affiliation':
                'Justice League of America, The Legion of Super-Heroes (pre-Crisis as Superboy); Justice Society of America (pre-Crisis Earth-2 version); All-Star Squadron (pre-Crisis Earth-2 version)',
            relatives:
                'Lois Lane (wife), Jor-El (father, deceased), Lara (mother, deceased), Jonathan Kent (adoptive father), Martha Kent (adoptive mother), Seyg-El (paternal grandfather, deceased), Zor-El (uncle, deceased), Alura (aunt, deceased), Supergirl (Kara Zor-El, cousin), Superboy (Kon-El/Conner Kent, partial clone)',
            },
            image: {
            url: 'https://www.superherodb.com/pictures2/portraits/10/100/791.jpg',
            },
        },
        {
            id: '69',
            name: 'Batman',
            powerstats: {
            intelligence: '81',
            strength: '40',
            speed: '29',
            durability: '55',
            power: '63',
            combat: '90',
            },
            biography: {
            'full-name': 'Terry McGinnis',
            'alter-egos': 'No alter egos found.',
            aliases: [
                'Batman II',
                'The Tomorrow Knight',
                'The second Dark Knight',
                'The Dark Knight of Tomorrow',
                'Batman Beyond',
            ],
            'place-of-birth': 'Gotham City, 25th Century',
            'first-appearance': 'Batman Beyond #1',
            publisher: 'DC Comics',
            alignment: 'good',
            },
            appearance: {
            gender: 'Male',
            race: 'Human',
            height: ["5'10", '178 cm'],
            weight: ['170 lb', '77 kg'],
            'eye-color': 'Blue',
            'hair-color': 'Black',
            },
            work: {
            occupation: '-',
            base: '21st Century Gotham City',
            },
            connections: {
            'group-affiliation': 'Batman Family, Justice League Unlimited',
            relatives:
                'Bruce Wayne (biological father), Warren McGinnis (father, deceased), Mary McGinnis (mother), Matt McGinnis (brother)',
            },
            image: {
            url: 'https://www.superherodb.com/pictures2/portraits/10/100/10441.jpg',
            },
        },
    ];
  
    it('renders the list of superheroes', () => {
        const { getByText } = render(<SuperheroGridView superheroes={mockSuperheroes} onHeroSelect={jest.fn()} />);

        expect(getByText('Superman')).toBeInTheDocument();
        expect(getByText('Batman')).toBeInTheDocument();
    });


    it('filters the list based on search term', () => {
        const { getByPlaceholderText, queryByText } = render(<SuperheroGridView superheroes={mockSuperheroes} onHeroSelect={jest.fn()} />);
        
        // Enter search term 'Batman'
        fireEvent.change(getByPlaceholderText('Search superheroes...'), { target: { value: 'Batman' } });
    
        expect(queryByText('Superman')).not.toBeInTheDocument();
        expect(queryByText('Batman')).toBeInTheDocument();
    });

    it('displays no heroes found when search term does not match any superhero', () => {
        const { getByPlaceholderText, getByText } = render(<SuperheroGridView superheroes={mockSuperheroes} onHeroSelect={jest.fn()} />);
        
        // Enter search term 'Wonder Woman'
        fireEvent.change(getByPlaceholderText('Search superheroes...'), { target: { value: 'Wonder Woman' } });

        expect(getByText('No superheroes found')).toBeInTheDocument();
    });

    it('calls onHeroSelect when a hero is clicked', () => {
        const onHeroSelect = jest.fn();
        const { getByText } = render(<SuperheroGridView superheroes={mockSuperheroes} onHeroSelect={onHeroSelect} />);

        fireEvent.click(getByText('Superman'));

        expect(onHeroSelect).toHaveBeenCalledTimes(1);
    });

    it('opens the modal with hero details when a hero is clicked', () => {
        const { getAllByText, queryByText } = render(<SuperheroGridView superheroes={mockSuperheroes} onHeroSelect={jest.fn()} />);
    
        // Click on the hero in the grid to open the modal
        fireEvent.click(getAllByText('Superman')[0]); // Click on the first occurrence in the grid
    
        // Use a more specific check to ensure the modal opened
        expect(queryByText('Krypton')).toBeInTheDocument(); // Check hero's place of birth in the modal
    });
  
    it('closes the modal when the close button is clicked', () => {
        const { getByText, queryByText, container } = render(<SuperheroGridView superheroes={mockSuperheroes} onHeroSelect={jest.fn()} />);

        // Click on the hero to open the modal
        fireEvent.click(getByText('Superman'));

        // Ensure that the modal is open by checking for a specific piece of hero information
        expect(queryByText('Krypton')).toBeInTheDocument(); // Modal should be open

        // Close the modal
        fireEvent.click(getByText('Close'));

        // Ensure that the modal is closed by checking that the hero information is no longer in the document
        expect(queryByText('Krypton')).not.toBeInTheDocument(); // Modal should be closed
    });
  
});
