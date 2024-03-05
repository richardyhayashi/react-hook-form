import { ZodType, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import './App.css';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: string;
  confirmPassword: string;
}

function App() {
  const schema: ZodType<FormData> = z.object({
    firstName: z.string().min(2).max(30),
    lastName:  z.string().min(2).max(30),
    email: z.string().email(),
    age: z.number().min(18).max(70),
    password: z.string().min(6).max(20),
    confirmPassword: z.string().min(6).max(20),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

  const { register, handleSubmit, formState: {errors} } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const submitData = (data: FormData) => {
    console.log("Submitted!", data);
  }

  return (
    <div className='App'>
      <form onSubmit={handleSubmit(submitData)}>
        <label htmlFor="first_name">First Name:</label>
        <input type="text" {...register("firstName")} />
        {errors.firstName && <span className='error'>{errors.firstName.message}</span>}

        <label htmlFor="last_name">Last Name:</label>
        <input type="text" {...register("lastName")} />
        {errors.lastName && <span className='error'>{errors.lastName.message}</span>}
        
        <label htmlFor="email">Email:</label>
        <input type="email" {...register("email")} />
        {errors.email && <span className='error'>{errors.email.message}</span>}
        
        <label htmlFor="age">Age:</label>
        <input type="number" {...register("age", {valueAsNumber: true})} />
        {errors.age && <span className='error'>{errors.age.message}</span>}
        
        <label htmlFor="password">Password:</label>
        <input type="password" {...register("password")} />
        {errors.password && <span className='error'>{errors.password.message}</span>}
        
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" {...register("confirmPassword")} />
        {errors.confirmPassword && <span className='error'>{errors.confirmPassword.message}</span>}

        <input type="submit" />
      </form>

    </div>
  )
}

export default App;
