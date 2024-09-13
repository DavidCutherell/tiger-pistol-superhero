import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SuperheroList from '../SuperheroList'; // Adjusted to fit SuperheroList component
import '@testing-library/jest-dom';

describe('SuperheroList', () => {
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
                    'Justice League of America, The Legion of Super-Heroes; Justice Society of America',
                relatives:
                    'Lois Lane (wife), Jor-El (father), Lara (mother), Superboy (clone)',
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
                aliases: [
                    'Batman II',
                    'The Tomorrow Knight',
                    'The second Dark Knight',
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
                relatives: 'Bruce Wayne (father), Warren McGinnis (father)',
            },
            image: {
                url: 'https://www.superherodb.com/pictures2/portraits/10/100/10441.jpg',
            },
        },
    ];

    it('renders the list of superheroes', () => {
        const { getByText } = render(<SuperheroList superheroes={mockSuperheroes} onHeroSelect={jest.fn()} />);

        expect(getByText('Superman')).toBeInTheDocument();
        expect(getByText('Batman')).toBeInTheDocument();
    });

    it('filters the list based on search term', () => {
        const { getByPlaceholderText, queryByText } = render(<SuperheroList superheroes={mockSuperheroes} onHeroSelect={jest.fn()} />);
        
        fireEvent.change(getByPlaceholderText('Search superheroes...'), { target: { value: 'Batman' } });
    
        expect(queryByText('Superman')).not.toBeInTheDocument();
        expect(queryByText('Batman')).toBeInTheDocument();
    });

    it('displays no heroes found when search term does not match any superhero', () => {
        const { getByPlaceholderText, getByText } = render(<SuperheroList superheroes={mockSuperheroes} onHeroSelect={jest.fn()} />);
        
        fireEvent.change(getByPlaceholderText('Search superheroes...'), { target: { value: 'Wonder Woman' } });

        expect(getByText('No superheroes found')).toBeInTheDocument();
    });

    it('calls onHeroSelect when a hero is clicked', () => {
        const onHeroSelect = jest.fn();
        const { getByText } = render(<SuperheroList superheroes={mockSuperheroes} onHeroSelect={onHeroSelect} />);

        fireEvent.click(getByText('Superman'));

        expect(onHeroSelect).toHaveBeenCalledTimes(1);
    });

    it('expands the superhero details when a hero is clicked', () => {
        const { getAllByText, queryByText } = render(<SuperheroList superheroes={mockSuperheroes} onHeroSelect={jest.fn()} />);
    
        // Click on the first occurrence of 'Superman' to expand details
        fireEvent.click(getAllByText('Superman')[0]); 
    
        // Ensure that the details are now expanded
        expect(queryByText('Krypton')).toBeInTheDocument(); // Check if hero's place of birth is visible after expanding
    });

    it('collapses the superhero details when a hero is clicked again', () => {
        const { getByText, queryByText } = render(<SuperheroList superheroes={mockSuperheroes} onHeroSelect={jest.fn()} />);

        // Click on 'Superman' to expand the details
        fireEvent.click(getByText('Superman'));

        // Ensure that the details are expanded
        expect(queryByText('Krypton')).toBeInTheDocument(); // Check if place of birth is shown

        // Click on 'Superman' again to collapse the details
        fireEvent.click(getByText('Superman'));

        // Ensure that the details are now collapsed
        expect(queryByText('Krypton')).not.toBeInTheDocument(); // Check that place of birth is no longer visible
    });

});
