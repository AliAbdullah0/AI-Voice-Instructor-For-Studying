interface UserType {
    id: string;
    username: string;
    email: string;
    image?:string;
    coursesCreated:string[];
    enrollments :string[]
    createdAt:Date;
    updatedAt:Date;
}

interface RouteParams {
    params: Promise<Record<string, string>>;
    searchParams: Promise<Record<string, string>>;
}
declare module "sonner" {
    export function toast(message: string | React.ReactNode, options?: any): void;
    export namespace toast {
      export function success(message: string | React.ReactNode, options?: any): void;
      export function error(message: string | React.ReactNode, options?: any): void;
      export function info(message: string | React.ReactNode, options?: any): void;
      export function warning(message: string | React.ReactNode, options?: any): void;
    }
    export const Toaster: React.FC<any>;
  }
interface Course {
    id:string;
    name:string;
    description:string;
    rating?:string;
    coursePrompt?:JSON;
    systemPrompt?:string;
    image?:string;

    createdAt:Date;
    updatedAt:Date;
}