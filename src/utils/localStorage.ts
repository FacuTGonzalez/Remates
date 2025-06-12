// Definimos el tipo de la sesión
type UserSession = {
    user: string;
    isLogged: boolean;
  };
  
  // Guardar sesión
  export const saveUserSession = (username: string): void => {
    const sessionData: UserSession = {
      user: username,
      isLogged: true,
    };
    //@ts-ignore
    localStorage.setItem('userSession', JSON.stringify(sessionData));
  };
  
  // Obtener sesión
  export const getUserSession = (): UserSession | null => {
    const sessionData = localStorage.getItem('userSession');
    return sessionData ? JSON.parse(sessionData) as UserSession : null;
  };
  
  // Borrar sesión
  export const clearUserSession = (): void => {
    localStorage.removeItem('userSession');
  };
  