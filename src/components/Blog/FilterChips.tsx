import React from 'react';
import { Chip, Stack, Typography, Box, useTheme } from '@mui/material';

interface FilterChipsProps {
  title: string;
  items: string[];
  selectedItems: string[];
  onToggle: (item: string) => void;
}

const FilterChips: React.FC<FilterChipsProps> = ({ title, items, selectedItems, onToggle }) => {
  const theme = useTheme();

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <Box mb={2}>
      <Typography variant="overline" display="block" gutterBottom sx={{ color: theme.palette.text.secondary }}>
        {title}
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {items.map((item) => {
          const isSelected = selectedItems.includes(item);
          return (
            <Chip
              key={item}
              label={item}
              clickable
              onClick={() => onToggle(item)}
              variant={isSelected ? 'filled' : 'outlined'}
              color={isSelected ? 'primary' : 'default'}
              sx={{
                // Example of using theme if needed:
                // backgroundColor: isSelected ? theme.palette.primary.main : 'transparent',
                // color: isSelected ? theme.palette.primary.contrastText : theme.palette.text.primary,
                // borderColor: isSelected ? theme.palette.primary.main : theme.palette.divider,
                // '&:hover': {
                //   backgroundColor: isSelected ? theme.palette.primary.dark : theme.palette.action.hover,
                // },
              }}
            />
          );
        })}
      </Stack>
    </Box>
  );
};

export default FilterChips;
