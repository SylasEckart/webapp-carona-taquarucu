import React from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  Avatar,
  Divider,
  useTheme,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Star, AccessTime, Person } from '@mui/icons-material';
import { RideDetails } from '@/hooks/useRideModal';
import AddFriend from '../forms/AddFriend';

interface ModalDefaultProps {
  open?: boolean;
  onClose?: () => void;
  onConfirm?: () => Promise<void>;
  ride?: RideDetails | null;
  isLoading: boolean;
  error?: Error | null;
}

const ModalDefault: React.FC<ModalDefaultProps> = ({
  open = false,
  onClose = () => {},
  onConfirm = () => Promise.resolve(),
  ride,
  isLoading = false,
  error
}) => {
  const theme = useTheme();

  if (!ride) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="ride-details-modal"
      aria-describedby="ride-details-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 400 },
          bgcolor: 'background.paper',
          borderRadius: 4,
          boxShadow: 24,
          p: 3,
        }}
      >

        {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="h2">
            Detalhes da Carona
          </Typography>
          <IconButton onClick={onClose} size="small" disabled={isLoading}>
            <CloseIcon />
          </IconButton>
        </Box> */}


        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error.message}
          </Alert>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar
            src={ride.driver?.image}
            sx={{ width: 56, height: 56, mr: 2 }}
          >
            {ride.driver?.name?.[0]}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {ride.driver?.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Star sx={{ color: theme.palette.warning.main, mr: 0.5 }} fontSize="small" />
              <Typography variant="body2">
                {ride.driver?.rating?.toFixed(1)}
              </Typography>
            </Box>
          </Box>
        </Box>

        <AddFriend/>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <AccessTime sx={{ mr: 1, color: 'text.secondary' }} />
            <Typography variant="body1">
              Tempo estimado: {ride.time}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Person sx={{ mr: 1, color: 'text.secondary' }} />
            <Typography variant="body1">
              Assentos disponíveis: {ride.remainingSeats}
            </Typography>
          </Box>
          {ride.price && (
            <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
              R$ {ride.price.toFixed(2)}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            fullWidth
            onClick={onClose}
            disabled={isLoading}
            sx={{ borderRadius: 2 }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            fullWidth
            disabled={isLoading}
            onClick={onConfirm}
            sx={{ 
              borderRadius: 2,
              position: 'relative',
            }}
          >
            {isLoading && (
              <CircularProgress
                size={24}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            )}
            <span style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
              Confirmar
            </span>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalDefault;