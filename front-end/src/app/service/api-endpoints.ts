// src/app/shared/api-endpoints.ts

export const API_ENDPOINTS = {
    BASE_URL: 'http://localhost:8080/to-do-list/api/v1',
    
    AUTH: {
      SIGNUP: '/auth/sign-up',
      SIGNIN: '/auth/sign-in',
    },
  

    TASK: {
      CREATE: '/task/add',
      ID_BY_TASK: (id: any) => `/task/get/${id}`,
      UPDATE: (id: number) => `/task/update/${id}`,
      DELETE: (id: number) => `/task/delete/${id}`,
      GET_ALL: (id: number) => `/task/getAll/${id}`,
    }
  };
  