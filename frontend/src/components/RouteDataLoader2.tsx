/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import type { IService, MasterDetailData } from '../dataModel';

// Context type definition
type RouteDataContextType = {
  data: MasterDetailData | null;
  isLoading: boolean;
  error: Error | null;
  reload: () => void;
};

// Create context with a sensible default
const RouteDataContext = createContext<RouteDataContextType>({
  data: null,
  isLoading: false,
  error: null,
  reload: () => {},
});

// Props for our provider
type RouteDataProviderProps = {
  children: React.ReactNode;
  service: IService;
  // loadData: LoadDataFn;
};

export function RouteDataProvider2({ children, service }: RouteDataProviderProps) {
  const location = useLocation();
  const [data, setData] = useState<MasterDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Use ref to track previous pathname
  const prevPathnameRef = useRef<string | null>(null);
  
  // Memoized function to load data
  const fetchData = useCallback(async (path: string) => {
    console.log(`RouteDataLoader2: Starting data load for path: ${path}`);
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await service.getData(path);
      console.log(`RouteDataLoader2: Data load complete for path: ${path}`);
      console.log(`RouteDataLoader2: Result: ${JSON.stringify(result, null, 2)}`);
      setData(result);
    } catch (err) {
      console.error(`RouteDataLoader2: Error loading data for path: ${path}`, err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      console.log(`RouteDataLoader2: setIsLoading(false)`);
      setIsLoading(false);
    }
  }, [service]);
  
  // Effect for pathname changes
  useEffect(() => {
    // Current pathname from location
    const currentPathname = location.pathname;
    
    // Only fetch if pathname has changed
    if (currentPathname !== prevPathnameRef.current) {
      console.log(`RouteDataLoader2: Pathname changed from ${prevPathnameRef.current} to ${currentPathname}`);
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
  
  // Provide render debugging info
  useEffect(() => {
    console.log('RouteDataLoader2: State updated:', { 
      isLoading, 
      hasData: !!data, 
      hasError: !!error, 
      pathname: location.pathname 
    });
  }, [isLoading, data, error, location.pathname]);
  
  const value = {
    data,
    isLoading,
    error,
    reload
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
  
  // Add render counter for debugging
  const renderCount = useRef(0);
  renderCount.current++;
  
  console.log(`useRouteData render #${renderCount.current}:`, {
    isLoading: context.isLoading,
    hasData: !!context.data,
    hasError: !!context.error
  });
  
  if (!context) {
    throw new Error('useRouteData must be used within a RouteDataProvider');
  }
  
  return context;
}
