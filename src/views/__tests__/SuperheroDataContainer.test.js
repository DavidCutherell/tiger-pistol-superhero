import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SuperheroDataContainer from '../SuperheroDataContainer';
import SuperheroList from '../SuperheroList';
import SuperheroGrid from '../SuperheroGrid';
import PunchRandom from '../../components/punchRandom';
import 'whatwg-fetch';
import '@testing-library/jest-dom';



jest.mock('../SuperheroList');
jest.mock('../SuperheroGrid');
jest.mock('../../components/punchRandom');

describe('SuperheroDataContainer', () => {
  const mockSuperheroes = [
    { id: '1', name: 'Superman', biography: { 'full-name': 'Clark Kent' }, image: { url: 'superman.png' } },
    { id: '2', name: 'Batman', biography: { 'full-name': 'Bruce Wayne' }, image: { url: 'batman.png' } },
  ];

  beforeEach(() => {
    SuperheroList.mockImplementation(({ onHeroSelect }) => (
      <div>
        <div data-testid="superhero-list-item" onClick={onHeroSelect}>
          Superman
        </div>
      </div>
    ));
    
    SuperheroGrid.mockImplementation(({ onHeroSelect }) => (
      <div>
        <div data-testid="superhero-grid-item" onClick={onHeroSelect}>
          Batman
        </div>
      </div>
    ));

    PunchRandom.mockImplementation(({ trigger }) => <div data-testid="punch-random" />);
  });

  it('renders the List view by default and switches to Grid view on tab click', () => {
    const { getByText, getByRole } = render(<SuperheroDataContainer />);
    
    // Check List View is the default
    expect(getByText('Superman')).toBeInTheDocument();
  
    // Click on the Grid View button
    fireEvent.click(getByRole('button', { name: 'Grid View' }));
  
    // Check Grid View is now active
    expect(getByText('Batman')).toBeInTheDocument();
  });

  
  it('triggers PunchRandom when a superhero is selected from the list', async () => {
    const { getByTestId, getByRole } = render(<SuperheroDataContainer />);
  
    // Click on a superhero in the list
    fireEvent.click(getByTestId('superhero-list-item'));
  
    // Check PunchRandom is triggered
    await waitFor(() => {
      expect(getByTestId('punch-random')).toBeInTheDocument();
    });
  });  


  it('triggers PunchRandom when a superhero is selected from the grid', async () => {
    const { getByTestId, getByRole } = render(<SuperheroDataContainer />);
  
    // Switch to Grid View by clicking the correct button
    fireEvent.click(getByRole('button', { name: 'Grid View' }));
  
    // Click on a superhero in the grid
    fireEvent.click(getByTestId('superhero-grid-item'));
  
    // Check PunchRandom is triggered
    await waitFor(() => {
      expect(getByTestId('punch-random')).toBeInTheDocument();
    });
  });
  
});
