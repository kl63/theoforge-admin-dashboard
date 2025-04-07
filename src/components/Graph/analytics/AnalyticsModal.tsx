import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Tabs,
  Tab,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  LinearProgress
} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { PhilosopherData, GraphNode } from '@/components/Graph/EnterprisePhilosopherGraph';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`analytics-tabpanel-${index}`}
      aria-labelledby={`analytics-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `analytics-tab-${index}`,
    'aria-controls': `analytics-tabpanel-${index}`,
  };
}

interface AnalyticsModalProps {
  open: boolean;
  onClose: () => void;
  data: PhilosopherData;
}

const AnalyticsModal: React.FC<AnalyticsModalProps> = ({ open, onClose, data }) => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Calculate analytics data
  const calculateInfluenceRanking = () => {
    return [...data.nodes]
      .sort((a, b) => b.influenceScore - a.influenceScore)
      .slice(0, 10);
  };

  const calculateConnectivity = () => {
    const connectivity: Record<string, number> = {};
    
    data.nodes.forEach(node => {
      connectivity[node.id] = 0;
    });
    
    data.links.forEach(link => {
      const sourceId = typeof link.source === 'object' ? (link.source as GraphNode).id : link.source;
      const targetId = typeof link.target === 'object' ? (link.target as GraphNode).id : link.target;
      
      if (connectivity[sourceId] !== undefined) {
        connectivity[sourceId]++;
      }
      if (connectivity[targetId] !== undefined) {
        connectivity[targetId]++;
      }
    });
    
    return Object.entries(connectivity)
      .map(([id, count]) => ({
        id,
        name: data.nodes.find(node => node.id === id)?.name || id,
        connections: count
      }))
      .sort((a, b) => b.connections - a.connections)
      .slice(0, 10);
  };

  const calculateEraCounts = () => {
    const eraCounts: Record<string, number> = {};
    
    data.nodes.forEach(node => {
      eraCounts[node.era] = (eraCounts[node.era] || 0) + 1;
    });
    
    return Object.entries(eraCounts)
      .map(([era, count]) => ({ era, count }))
      .sort((a, b) => b.count - a.count);
  };

  const influenceRanking = calculateInfluenceRanking();
  const connectivity = calculateConnectivity();
  const eraCounts = calculateEraCounts();

  // Color scale for communities
  const communityColors = ["#00796B", "#1976D2", "#FFA000", "#7B1FA2", "#C62828", "#795548"];

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
        }
      }}
    >
      <DialogTitle sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
        <Typography variant="h5" component="div" fontWeight="bold">
          Philosophical Network Analysis
        </Typography>
      </DialogTitle>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="analytics tabs">
          <Tab label="Executive Summary" {...a11yProps(0)} />
          <Tab label="Influence Metrics" {...a11yProps(1)} />
          <Tab label="Network Insights" {...a11yProps(2)} />
        </Tabs>
      </Box>
      
      <DialogContent>
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom>
            Key Findings
          </Typography>
          
          <Typography paragraph>
            This network analysis reveals the complex interconnections between {data.nodes.length} major philosophers across different eras of history.
            The visualization demonstrates how ideas have propagated through time, with clear influence patterns emerging.
          </Typography>
          
          <Box sx={{ my: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Most Influential Philosophers
            </Typography>
            <List>
              {influenceRanking.slice(0, 5).map((philosopher, index) => (
                <ListItem key={philosopher.id}>
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: communityColors[philosopher.community % communityColors.length] }}>
                      {index + 1}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText 
                    primary={philosopher.name} 
                    secondary={`Influence Score: ${philosopher.influenceScore}`} 
                  />
                  <Box sx={{ width: '40%', mr: 2 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={(philosopher.influenceScore / 10) * 100} 
                      sx={{ 
                        height: 8, 
                        borderRadius: 5,
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: communityColors[philosopher.community % communityColors.length]
                        }
                      }} 
                    />
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>
          
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Era Distribution
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {eraCounts.map(({ era, count }) => (
              <Box 
                key={era}
                sx={{ 
                  p: 2, 
                  borderRadius: 2, 
                  bgcolor: 'rgba(0,0,0,0.05)', 
                  minWidth: 120,
                  textAlign: 'center'
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {era}
                </Typography>
                <Typography variant="h6">
                  {count}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  philosophers
                </Typography>
              </Box>
            ))}
          </Box>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            Philosopher Influence Rankings
          </Typography>
          
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>Philosopher</TableCell>
                <TableCell>Era</TableCell>
                <TableCell>Community</TableCell>
                <TableCell>Influence Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {influenceRanking.map((philosopher, index) => (
                <TableRow key={philosopher.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{philosopher.name}</TableCell>
                  <TableCell>{philosopher.era}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <FiberManualRecordIcon 
                        fontSize="small" 
                        sx={{ color: communityColors[philosopher.community % communityColors.length], mr: 1 }} 
                      />
                      {philosopher.community}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ width: '100%', mr: 1 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={(philosopher.influenceScore / 10) * 100} 
                          sx={{ 
                            height: 8, 
                            borderRadius: 5,
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: communityColors[philosopher.community % communityColors.length]
                            }
                          }} 
                        />
                      </Box>
                      <Box sx={{ minWidth: 35 }}>
                        <Typography variant="body2" color="text.secondary">
                          {philosopher.influenceScore.toFixed(1)}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            Network Connectivity Analysis
          </Typography>
          
          <Typography paragraph>
            This analysis shows which philosophers are most central to the network based on their connections.
            Higher connectivity indicates philosophers who have influenced or been influenced by many others.
          </Typography>
          
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>Philosopher</TableCell>
                <TableCell>Connections</TableCell>
                <TableCell>Connectivity Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {connectivity.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.connections}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ width: '100%', mr: 1 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={(item.connections / connectivity[0].connections) * 100} 
                          sx={{ 
                            height: 8, 
                            borderRadius: 5,
                            backgroundColor: 'rgba(0,0,0,0.1)'
                          }} 
                        />
                      </Box>
                      <Box sx={{ minWidth: 35 }}>
                        <Typography variant="body2" color="text.secondary">
                          {((item.connections / connectivity[0].connections) * 100).toFixed(0)}%
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <Box sx={{ mt: 4 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Network Statistics
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(0,0,0,0.05)', minWidth: 120, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">Nodes</Typography>
                <Typography variant="h6">{data.nodes.length}</Typography>
              </Box>
              <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(0,0,0,0.05)', minWidth: 120, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">Connections</Typography>
                <Typography variant="h6">{data.links.length}</Typography>
              </Box>
              <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(0,0,0,0.05)', minWidth: 120, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">Communities</Typography>
                <Typography variant="h6">{new Set(data.nodes.map(n => n.community)).size}</Typography>
              </Box>
              <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(0,0,0,0.05)', minWidth: 120, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">Avg. Connections</Typography>
                <Typography variant="h6">{(data.links.length / data.nodes.length).toFixed(1)}</Typography>
              </Box>
            </Box>
          </Box>
        </TabPanel>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AnalyticsModal;
