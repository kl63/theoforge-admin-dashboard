import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Autocomplete,
  Typography,
  Box,
  Avatar,
  InputAdornment,
  CircularProgress,
  styled
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { GraphNode } from '@/components/Graph/EnterprisePhilosopherGraph';

interface SearchBarProps {
  data: GraphNode[];
  onSelect: (node: GraphNode | null) => void;
  onSearchChange?: (query: string) => void;
}

// Styled components for enhanced visual appeal
const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    borderRadius: '28px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
    },
    '&.Mui-focused': {
      boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
    }
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderWidth: '1px',
    borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
  }
}));

const SearchBar: React.FC<SearchBarProps> = ({ data, onSelect, onSearchChange }) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<GraphNode[]>([]);
  const loading = open && options.length === 0 && data.length > 0;

  // Update options when data changes
  useEffect(() => {
    if (data.length > 0) {
      setOptions(data);
    }
  }, [data]);

  // Filter options based on input value
  useEffect(() => {
    if (!open) {
      return;
    }

    if (inputValue === '') {
      setOptions(data.slice(0, 10)); // Show top 10 when empty
      return;
    }

    // Filter based on input value
    const filtered = data.filter(
      (option) => 
        (option as GraphNode).name.toLowerCase().includes(inputValue.toLowerCase()) ||
        ((option as GraphNode).era && (option as GraphNode).era.toLowerCase().includes(inputValue.toLowerCase())) ||
        ((option as GraphNode).community !== undefined && (option as GraphNode).community.toString().includes(inputValue))
    );
    
    setOptions(filtered.slice(0, 15)); // Limit to 15 results for performance
  }, [inputValue, open, data]);

  return (
    <StyledAutocomplete
      id="philosopher-search"
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
        // Call the onSearchChange prop if provided
        if (onSearchChange) {
          onSearchChange(newInputValue);
        }
      }}
      onChange={(event, newValue) => {
        onSelect(newValue as GraphNode | null); 
      }}
      options={options}
      loading={loading}
      getOptionLabel={(option) => (option as GraphNode).name || ''}
      filterOptions={(x) => x} // We handle filtering ourselves
      noOptionsText="No philosophers found"
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search philosophers..."
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <li {...props} key={(option as GraphNode).id}>
          <Box display="flex" alignItems="center" width="100%" py={0.5}>
            <Avatar 
              sx={{ 
                width: 36, 
                height: 36, 
                bgcolor: (option as GraphNode).community ? `hsl(${parseInt((option as GraphNode).community.toString()) * 137.5 % 360}, 70%, 65%)` : 'gray',
                mr: 1.5,
                fontSize: '0.875rem'
              }}
            >
              {(option as GraphNode).name.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="body1" fontWeight={500}>
                {(option as GraphNode).name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {(option as GraphNode).era} • {(option as GraphNode).community ? `Community ${(option as GraphNode).community}` : 'Unknown community'}
              </Typography>
            </Box>
          </Box>
        </li>
      )}
    />
  );
};

export default SearchBar;
