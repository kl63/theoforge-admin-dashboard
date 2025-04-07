import React from 'react';
import { Box, Button, ButtonGroup, FormControlLabel, Switch, Typography, Paper } from '@mui/material';

interface LayoutControlsProps {
  selectedLayout: string;
  onLayoutChange: (layout: string) => void;
  physicsEnabled: boolean;
  onPhysicsToggle: (enabled: boolean) => void;
  onRefresh: () => void;
  onAnalytics: () => void;
}

const LayoutControls: React.FC<LayoutControlsProps> = ({
  selectedLayout,
  onLayoutChange,
  physicsEnabled,
  onPhysicsToggle,
  onRefresh,
  onAnalytics
}) => {
  return (
    <Paper 
      elevation={3}
      sx={{ 
        p: 2, 
        borderRadius: 2,
        width: 220,
        position: 'absolute',
        top: 16,
        left: 16,
        zIndex: 1000,
        backdropFilter: 'blur(5px)',
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        Graph Controls
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Layout
        </Typography>
        <ButtonGroup size="small" fullWidth variant="outlined">
          <Button 
            onClick={() => onLayoutChange('force')}
            variant={selectedLayout === 'force' ? 'contained' : 'outlined'}
          >
            Force
          </Button>
          <Button 
            onClick={() => onLayoutChange('radial')}
            variant={selectedLayout === 'radial' ? 'contained' : 'outlined'}
          >
            Radial
          </Button>
        </ButtonGroup>
        <ButtonGroup size="small" fullWidth variant="outlined" sx={{ mt: 1 }}>
          <Button 
            onClick={() => onLayoutChange('hierarchical')}
            variant={selectedLayout === 'hierarchical' ? 'contained' : 'outlined'}
          >
            Hierarchical
          </Button>
          <Button 
            onClick={() => onLayoutChange('timeline')}
            variant={selectedLayout === 'timeline' ? 'contained' : 'outlined'}
          >
            Timeline
          </Button>
        </ButtonGroup>
      </Box>
      
      <Box sx={{ mb: 2 }}>
        <FormControlLabel
          control={
            <Switch 
              checked={physicsEnabled}
              onChange={(e) => onPhysicsToggle(e.target.checked)}
              size="small"
            />
          }
          label="Enable Physics"
        />
      </Box>
      
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button 
          variant="outlined" 
          size="small" 
          onClick={onRefresh}
          fullWidth
        >
          Refresh
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          size="small" 
          onClick={onAnalytics}
          fullWidth
        >
          Analytics
        </Button>
      </Box>
    </Paper>
  );
};

export default LayoutControls;
