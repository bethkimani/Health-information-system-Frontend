// api.js - Changes to fix the JWT handling and CORS issue
import axios from 'axios';

const API_URL = 'https://health-inforamtion-system-backend.onrender.com/api'; // Use localhost for consistency

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: false  // Changed to false to avoid CORS preflight issues
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Standardize successful responses
    if (response.data && !response.data.success) {
      return {
        ...response,
        data: {
          success: true,
          data: response.data.data || response.data
        }
      };
    }
    return response;
  },
  (error) => {
    // Standardize error responses
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
      
      // Handle 422 Unprocessable Entity errors specifically
      if (error.response.status === 422) {
        console.error('JWT validation error - check token');
      }
      
      error.response.data = {
        success: false,
        message: error.response.data?.message || 'Request failed',
        errors: error.response.data?.errors || null,
        status: error.response.status
      };
    } else {
      console.error('API Connection Error:', error.message);
      error.response = {
        data: {
          success: false,
          message: 'Network error - could not connect to server',
          status: 0
        }
      };
    }
    return Promise.reject(error);
  }
);

// Add these functions back to api.js
// Auth API
export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { success: false, message: 'Network error' };
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { success: false, message: 'Network error' };
  }
};

// Then add the client functions
export const addClient = async (clientData) => {
  try {
    // Ensure date is formatted correctly
    const formattedData = {
      ...clientData,
      dob: clientData.dob // Should be in YYYY-MM-DD format
    };
    const response = await api.post('/clients', formattedData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { success: false, message: 'Network error' };
  }
};


// Clients API
export const fetchClients = async () => {
  try {
    const response = await api.get('/clients');
    return {
      success: true,
      data: response.data.data || response.data
    };
  } catch (error) {
    // Handle 401/422 errors more gracefully
    if (error.response && (error.response.status === 401 || error.response.status === 422)) {
      console.error('Authentication error - redirecting to login');
      // Optionally clear token and redirect to login
      localStorage.removeItem('access_token');
      // window.location.href = '/login';  // Uncomment if you want automatic redirect
    }
    throw error.response ? error.response.data : { success: false, message: 'Network error' };
  }
};

// Keep the rest of your API methods unchanged

// Programs API
export const fetchPrograms = async () => {
  try {
    const response = await api.get('/programs');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const addProgram = async (programData) => {
  try {
    const response = await api.post('/programs', programData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteProgram = async (id) => {
  try {
    const response = await api.delete(`/programs/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Appointments API
export const fetchAppointments = async () => {
  try {
    const response = await api.get('/appointments');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const approveAppointment = async (id) => {
  try {
    const response = await api.patch(`/appointments/${id}/approve`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const rejectAppointment = async (id) => {
  try {
    const response = await api.patch(`/appointments/${id}/reject`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Health Records API
export const fetchHealthRecords = async () => {
  try {
    const response = await api.get('/health-records');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const completeHealthRecord = async (id) => {
  try {
    const response = await api.patch(`/health-records/${id}/complete`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Suppliers API
export const fetchSuppliers = async () => {
  try {
    const response = await api.get('/suppliers');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const addSupplier = async (supplierData) => {
  try {
    const response = await api.post('/suppliers', supplierData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateSupplier = async (id, supplierData) => {
  try {
    const response = await api.put(`/suppliers/${id}`, supplierData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteSupplier = async (id) => {
  try {
    const response = await api.delete(`/suppliers/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Team Members API
export const fetchTeamMembers = async () => {
  try {
    const response = await api.get('/team');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const addTeamMember = async (teamMemberData) => {
  try {
    const response = await api.post('/team', teamMemberData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateTeamMember = async (id, teamMemberData) => {
  try {
    const response = await api.put(`/team/${id}`, teamMemberData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteTeamMember = async (id) => {
  try {
    const response = await api.delete(`/team/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Dashboard API
export const fetchDashboardData = async () => {
  try {
    const [appointments, healthRecords] = await Promise.all([
      api.get('/appointments'),
      api.get('/health-records')
    ]);
    return {
      success: true,
      data: {
        appointments: appointments.data.data || appointments.data,
        healthRecords: healthRecords.data.data || healthRecords.data
      }
    };
  } catch (error) {
    throw error.response?.data || { 
      success: false, 
      message: 'Failed to load dashboard data' 
    };
  }
};

export default api;