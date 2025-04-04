import React from 'react';
import { Chip, Stack, styled } from '@mui/material';

// Create styled components to ensure proper contrast
const PrimaryChip = styled(Chip)(({ theme }) => ({
  backgroundColor: '#008080',
  color: '#ffffff',
  '& .MuiChip-label': {
    color: '#ffffff',
  },
  '&:hover': {
    backgroundColor: '#006666',
  },
}));

const OutlinedChip = styled(Chip)(({ theme }) => ({
  borderColor: '#008080',
  color: '#333333',
  '&:hover': {
    backgroundColor: 'rgba(0, 128, 128, 0.1)',
  },
}));

interface FilterChipsProps {
  activeFilter: 'all' | 'article' | 'podcast';
  onFilterChange: (filter: 'all' | 'article' | 'podcast') => void;
}

const FilterChips: React.FC<FilterChipsProps> = ({ activeFilter, onFilterChange }) => {
  return (
    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', justifyContent: 'center', mb: 3 }}>
      {activeFilter === 'all' ? (
        <PrimaryChip
          label="All Content"
          clickable
          onClick={() => onFilterChange('all')}
          data-filter-content="all"
        />
      ) : (
        <OutlinedChip
          label="All Content"
          variant="outlined"
          clickable
          onClick={() => onFilterChange('all')}
          data-filter-content="all"
        />
      )}
      
      {activeFilter === 'article' ? (
        <PrimaryChip
          label="Articles"
          clickable
          onClick={() => onFilterChange('article')}
          data-filter-content="article"
        />
      ) : (
        <OutlinedChip
          label="Articles"
          variant="outlined"
          clickable
          onClick={() => onFilterChange('article')}
          data-filter-content="article"
        />
      )}
      
      {activeFilter === 'podcast' ? (
        <PrimaryChip
          label="Podcasts"
          clickable
          onClick={() => onFilterChange('podcast')}
          data-filter-content="podcast"
        />
      ) : (
        <OutlinedChip
          label="Podcasts"
          variant="outlined"
          clickable
          onClick={() => onFilterChange('podcast')}
          data-filter-content="podcast"
        />
      )}
    </Stack>
  );
};

export default FilterChips;
