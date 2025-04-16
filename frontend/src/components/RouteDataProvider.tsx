/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import type { AnyRecord, IService, MasterDetailData } from '../dataModel';

// Context type definition
type RouteDataContextType = {
  data: MasterDetailData | null;
  isLoading: boolean;
  error: Error | null;
  currentPath: string; // Added to track the current path explicitly
  reload: () => void;
  update: (type: string, record: AnyRecord) => Promise<void>;
};

// Create context with a sensible default
const RouteDataContext = createContext<RouteDataContextType>({
  data: null,
  isLoading: false,
  error: null,
  currentPath: '',
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
  const [currentPath, setCurrentPath] = useState<string>('');
  
  // Use ref to track previous pathname and prevent race conditions
  const prevPathnameRef = useRef<string | null>(null);
  const fetchingRef = useRef<boolean>(false);
  
  // Memoized function to load data
  const fetchData = useCallback(async (path: string) => {
    // Prevent multiple concurrent fetches for the same path
    if (fetchingRef.current) {
      console.log(`RouteDataProvider: Already fetching data, ignoring request for: ${path}`);
      return;
    }
    
    console.log(`RouteDataProvider: Fetching data for path: ${path}`);
    setIsLoading(true);
    setError(null);
    fetchingRef.current = true;
    
    try {
      const result = await service.getData(path);
      console.log(`RouteDataProvider: Data fetched successfully for path: ${path}`);
      console.log(`RouteDataProvider: Data: ${JSON.stringify(result, null, 2)}`);
      
      // Only update if we're still on the same path
      if (path === location.pathname) {
        setData(result);
        setCurrentPath(path);
        console.log(`RouteDataProvider: Data set successfully for path: ${path}`);
      } else {
        console.log(`RouteDataProvider: Path changed during fetch, discarding results for: ${path}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
      fetchingRef.current = false;
    }
  }, [service, location.pathname]);
  
  // Effect for pathname changes
  useEffect(() => {
    // Current pathname from location
    const currentPathname = location.pathname;
    
    // Only fetch if pathname has changed
    if (currentPathname !== prevPathnameRef.current) {
      console.log(`RouteDataProvider: Path changed from ${prevPathnameRef.current} to ${currentPathname}`);
      prevPathnameRef.current = currentPathname;
      
      // Clear data and set loading state before fetching new data
      setData(null);
      setIsLoading(true);
      
      // Add a small delay to ensure state updates have propagated
      setTimeout(() => {
        fetchData(currentPathname);
      }, 10);
    }
  }, [location.pathname, fetchData]);
  
  // Manual reload function
  const reload = useCallback(() => {
    const currentPath = location.pathname;
    console.log(`RouteDataProvider: Manual reload triggered for path: ${currentPath}`);
    fetchData(currentPath);
  }, [location.pathname, fetchData]);
  
  // Update function
  const update = useCallback(async (type: string, record: AnyRecord) => {
    console.log(`RouteDataProvider: Updating record of type: ${type}`);
    setIsLoading(true);
    setError(null);
    
    try {
      const currentPath = location.pathname;
      const result = await service.update(currentPath, type, record);
      setData(result);
      setCurrentPath(currentPath);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  }, [location.pathname, service]);
  
  const value = {
    data,
    isLoading,
    error,
    currentPath,
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