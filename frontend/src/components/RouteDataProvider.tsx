/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import type { AnyRecord, IService, MasterDetailData } from '../dataModel';

// Context type definition
type RouteDataContextType = {
  data: MasterDetailData | null;
  isLoading: boolean;
  error: Error | null;
  reload: () => void;
  update: (type: string, record: AnyRecord) => Promise<void>;
};

// Create context with a sensible default
const RouteDataContext = createContext<RouteDataContextType>({
  data: null,
  isLoading: false,
  error: null,
  reload: () => {},
  update: () => Promise.resolve(),
});

// Props for our provider
type RouteDataProviderProps = {
  children: React.ReactNode;
  service: IService;
};

export function RouteDataProvider({ children, service }: RouteDataProviderProps) {
  const location = useLocation();
  const [data, setData] = useState<MasterDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Use ref to track previous pathname
  const prevPathnameRef = useRef<string | null>(null);
  
  // Memoized function to load data
  const fetchData = useCallback(async (path: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await service.getData(path);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  }, [service]);
  
  // Effect for pathname changes
  useEffect(() => {
    // Current pathname from location
    const currentPathname = location.pathname;
    
    // Only fetch if pathname has changed
    if (currentPathname !== prevPathnameRef.current) {
      prevPathnameRef.current = currentPathname;
      fetchData(currentPathname);
    }
  }, [location, fetchData]);
  
  // Manual reload function
  const reload = useCallback(() => {
    const currentPath = location.pathname;
    console.log(`RouteDataLoader2: Manual reload triggered for path: ${currentPath}`);
    fetchData(currentPath);
  }, [location, fetchData]);
  
  // Manual reload function
  const update = useCallback(async (type: string, record: AnyRecord) => {
    console.log(`RouteDataLoader2: Updating`);
    setIsLoading(true);
    setError(null);
    
    try {
      const currentPath = location.pathname;
      const result = await service.update(currentPath, type, record);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  }, [location, service]);
  
  const value = {
    data,
    isLoading,
    error,
    reload,
    update
  };

  return (
    <RouteDataContext.Provider value={value}>
      {children}
    </RouteDataContext.Provider>
  );
}

// Hook to use the data
export function useRouteData() {
  const context = useContext(RouteDataContext);
  
  if (!context) {
    throw new Error('useRouteData must be used within a RouteDataProvider');
  }
  
  return context;
}
