import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
    return (
        <Card className="w-full">
        <CardHeader>
            <CardTitle>
            <Skeleton className="h-4 w-1/2" />
            </CardTitle>
            <CardDescription>
            <Skeleton className="h-4 w-1/3" />
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Skeleton className="h-48 w-full" />
        </CardContent>
        </Card>
    );
    }