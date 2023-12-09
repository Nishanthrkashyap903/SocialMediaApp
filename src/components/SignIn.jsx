import { useForm } from 'react-hook-form';
import authService from '../appwrite/auth';
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';

function SignIn() {

  const dispatch=useDispatch();
  const navigate=useNavigate();
  

  const { handleSubmit, register, formState: { errors } } = useForm(
    {
      defaultValues: {
        emailAddress: "",
        password: ""
      }
    }
  );

  async function signIn(data){
    console.log(data);

    //TODO: Complete the function
    const userData=await authService.login(data);
    console.log(userData);
    //*{$id:    ,userId:   }
    if(userData)
    {
      dispatch(login(userData))
      navigate('/home');
    }
    else{
      navigate('/');
    }
  }

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign In
          </h2>
          
          <form className="mt-8" onSubmit={handleSubmit(signIn)}>
            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="text-base font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    autoComplete='off'
                    id="email"
                    {...register('emailAddress',
                      {
                        required: true,
                        validate:
                        {
                          matchPattern: (value) =>
                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address",
                        },
                      })}
                  />
                  {errors.emailAddress?.message && (<small className=' text-red-600'>{errors.emailAddress.message}</small>)}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-base font-medium text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    autoComplete='off'
                    id="password"
                    {...register('password', {
                      required: true,
                      validate: {
                        minLength: (value) =>
                          value.length >= 2 || "The password should have at least 2 characters"
                      }
                    })}
                  />
                  {errors.password?.message && (<small className=' text-red-600'>{errors.password.message}</small>)}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Sign In
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>

  )
}

export default SignIn