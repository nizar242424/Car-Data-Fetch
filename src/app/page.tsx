"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SkeletonCard from "@/components/SkeletonCard";

interface Car {
  id: number;
  name: string;
  color: string;
  model: string;
  year: number;
  image: string;
}

async function getCars(): Promise<Car[]> {
  const result = await fetch("http://localhost:4000/cars");
  await new Promise((resolve) => setTimeout(resolve, 3000)); 
  return result.json();
}

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCars() {
      try {
        const data = await getCars();
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

 if (loading) {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Car Collection</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </div>
  );
}

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Car Collection</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <Card key={car.id} className="hover:shadow-xl transition-all duration-300 border rounded-lg overflow-hidden">
            <div className="h-48 bg-gray-100 flex items-center justify-center">
              <img className="w-full h-full object-cover" src={car.image} alt="Car Image" />
            </div>
            
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold">{car.name}</CardTitle>
              <CardDescription className="text-gray-600">{car.model}</CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="flex items-center mb-3">
                <div 
                  className="w-5 h-5 rounded-full mr-2 border border-gray-300"
                  style={{ backgroundColor: car.color.toLowerCase() }}
                />
                <span className="text-sm capitalize">{car.color}</span>
              </div>
              
              <div className="flex justify-between text-sm py-2 border-t border-gray-100">
                <span className="text-gray-500">Year</span>
                <span className="font-medium">{car.year}</span>
              </div>
              
              <div className="flex justify-between text-sm py-2 border-t border-gray-100">
                <span className="text-gray-500">Model</span>
                <span className="font-medium">{car.model}</span>
              </div>
            </CardContent>
            
            <div className="px-6 pb-4">
              <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200">
                View Details
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}