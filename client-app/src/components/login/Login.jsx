
import { useLogin } from '../../api/authApi'
import { useUserContext } from '../../contexts/UserContext'
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify'


export default function Login({ 
  onSubmit,
  heading = 'Sign in'
}) {

const { login }  = useLogin()
const { userLoginHandler } = useUserContext();
// we access the values of userLoginHandler inside the UserContext 
const navigate = useNavigate();

const loginAction = async(e) => {
    
  e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');


    console.log("Form data is:", Object.fromEntries(formData))
    //console.log('Form data is:', formData)
    
    try {
        const authData = await login(email,password) // Fetch DB
        //console.log('authData is:', authData)
        userLoginHandler(authData) // Set authData in LocalStorage

        onSubmit(email,password)
      
        toast(`Welcome ${email}`, { type: 'success' })

        navigate('/')

    } catch (error) {
        toast(error.message,{ type: 'error'})
        
        console.log('Error is:', error)
    }

}

    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABYlBMVEX///8+2/+wltmZpOGtmNqVpuKUp+Khn96knd32a8JpwfFB2f6Hr+eNq+Wao+DtccVtvu+qmdvZfcz5asG8j9VQ0Pl1uu1K1PvheMnqc8ZcyfV7tuuIruZ6t+uBs+mint7Rgs62ktfEitPLhtDVgM3de8r++v1Yy/bBi9NjxfP1/f/i+f+0lNi6j9bldsjR6Pnz8fr/9fv61OzO8P3D5vlg3f2IyPF20vaCvu184f2l7f/U9v/q7vq18P/T1vG9pt/x6PeivuvI0/G+v+nSoNqzxOzPktX5uuL97Pf3kND/5vTE7f2a5f1+0/e45Pp9z/Wj1/a62fWez/KXtOeO6f/f5/jDzO61suXEwOmt0/Pd1fCW1fbD3PWbxu/TyezPuuXWseHZqd2xqeHlwubdltXKtuTjhs+6n9yotOavqOGpreTyqtzugsvFndrbjdLmuuPjotr7zOn9tuD9n9f9js/7e8eLAt7dAAAQbElEQVR4nO2diVMayxbGUSORuBA1NwlZrvtEByMjLhFFHFcWjXEDIypxTYjgdo3//+0+PTOgIpyeDVM1X7169cqaoef3Tk93zzlfd1wuR44cOXLkyJEjR44cOXLkyJEjR44cOXLkyJEjR47+Jomi6CeaGhkZWV4eGaH/m/xJrPZjmSJCNrU8vRIKjf0D+sT07tOXr7trqwT2r+YU/SOEbewN0T+qGN878p937wYGBt59210bDfir/aS6JE5NbzG6YsJiQEpI9YJQrgb+tlBOEbrGxjcYwIEXVOPja4FqPzRe/i1CV8R3t4++U3QH8MVLovH1vyKQ4jTgFREW+L4QfaX/VRKQ6PX4Uw+k6J+sabwH+ObLl5WVaTJo3rmQjEKra7vfvt0BfPn69euJvSccSHFqsqamsaYIcCxE2crc4Q+sro2Pv9D4qCbWw08UcmqrpqamKICEbgrzqCKlLBB+/Ph+Yj1p+dPya2prrKYQwcZQ2djdlxgO7IyrgASRMIate1RdEicpn4o3NjnFPYkTyA0N8P2//+4/rfdxGvgUwLFlnSsxMbw+8V4BJNp/Ol1V3KopAIamDP1WYEIFJNp5GmEUp2sKgFvGl5iBfZWwqWnzKYTRv6UBjm0Zi5+qvX0FsKnpQ0oy5Sf1S5waUwFrTOKjv7o3C3yE8MNsdcMoTmp8ZHwx8YfD6wrgh+bNOcHEH+aU1kNraibN/sZLzjJAour1VL/aQ2vGUIsXPklzCmBz82yVEKe0AG5ZM6onZxlgs7u5KiucZS2Ay1Y1IaYYoNtdb/94o82CNSErsyxzmwDorq+PWNhKKRUALeqhqpJZNyN0R2wdUrVZYmza6qbCiwBYX3dmK+K0bYBkTE3VU8C6ljobO6oGaNoqppyEFAWsa2lpsQ3RXkCiFANseW7TiKrOg2P2parnGODzDlvmRb8KaOfHWwoAiWxY3ahLNRsjSJVigB3bliOq3/O2vYOqUoyw4bvFc4Y6EdoO6BK+d1DAhoa0tYjqYlTHPEiTvxsb4xtEO3sB/iFDmu+ggA2/LR1Q1ZdwkvfG0bXxF3cy2xMTO7wlivA2BWxoPbLwVRRDylqU7zb/WnHxpZD4/bjDF8nkbyBstfBVnNYxT4iB3RelAd8T7Sd5fisNgK21ad4Hx0qdCXnmiZHdF2UAaU6U57X63kr17JlV/TTEPcr4VwceAXz/Xsv87uGfV/gNgLWnOp4eIdZHGzleQqWDKoDjG+t7Aaq99Y39Qma7qYkjfS9TQIJoST9VxlH8WkYc/VYA3BgNhLVyhiiGk0raFxK/m3vop8jUUsDaGSv66RZnHxXVHkoA10rUPMXwjprZbmqaw/6qNEMBawcz2BvwYsntRnTSQlzTavRrj90j7fyrJn5T2BlABsDBXzLyerTYerQRvVoTd1XA3XLdOjyrZLabF5GIQoYCDnb9MHtSXGa5e/RiRo3g+Gr564S5TSXxi+2o8swgJfxl8mAjsho9OnM4qgJWXpppeV9sjiJDAbs+mxzEEQBsxA4zI0oPHcf8PxJWEZGThjRDALs+d8nIh0GJLkhp/Ro5zPi/IV7BghREdxY5BWQooclBnGIVbGwI1wbwEaQKb7LcfQp3ufCLAn5+JSN/HqMtIBxDXh1Av4OqkpuQ2HYj+2n6MwX8/AP9+xXlZyFEVmBEZa02ytFChKXuF5H99JwAvnrVb1433QIjEDaEowzw0Xm+lIRFlrpHjqcZCviq/5ijhfLieguVEKJfQqZwFlL387ggCgDYf87VRBlNMyMQ8pEDbKlWYaZ/IEjdt7Qg38Qf/QSwv1vmbOQxhYBwBdnr1lgIefPF0hmk7udxV8v9oAPORh6Rn1likStSkX1N8IYQihM0dY/spgcUsHtpmLuZUppkbi5kJx1l34P8KX+hBWoTyLEm3U0J+81ZnEInfYOd7XcBcFdHO1moTWzjLpbPu/u7u7sPdLTzQFO0k75BfzaxEOqxa0ee09pEB+5i4aCbakHW0dB9TYPlN4Rdkr6EpIyeupTECJGTfpoC9iyZ0U1XwNOM/TAcZUknPYTCNtRekC+ivEAJe0yY9P0hMG1jPTNrQLimq6nvQPgdd/HwQQ8B7Dk0PpqOjFFC9KfvLhDyLEkLinQ87+hoQA41rmMK2LMk62qqWNOwrWAFezkz3evbF5LsoOWzI+TV6SVK2BPU1VSRxBUgROcQWWpbX7k9zMpnyKtjCxSw0/CL6A8BIbogylL3OgmheoYldB0CoeEXcQo22KGrTSKrTRgixH71HVPAzhNZV1sFjUAIQ+jrWfHFAGErOoZBIOxJ6GqrIM6BxhCh3Ar1QfTlS51EvQaHGjbQ/IMvqE0Aoc6xtJUC/sZeLjDCY2O5DDEEGwjxzgvYvfQRX0sqVrqVVnixs4XLtQCEl8YI/WOwQxK/CGN7l3b0tCWwCi8+g3ZJAXuvjA2mfrYFFH/DHlR49/W0JRy18hXpjylg74lBQtje+gV/Q4CV6HV9W0CNvlZG3xDs7CWInTEdbRU0AoT4odTlYoR6hpo0q9Hjb0jQEPa2GSNc5iYcBxeCnm66DTX6GfwNMUrY1mdsQpwGQh6P1x4zWejI0wAgjwdBIIRtbX3GJsQVIOTZUBFmhPzzReYZuCx4LAgU0BTCTyMcd4j7zEfC25IwA4CnPLPbRRslNPZ1sQIHIfAQugLMRLLO2VIGXCSDMs89JhF++vSJy0wqMaPMJt/aVHGR8PlkKGHf20uuhu4rBEdZ8BVZ9pgRCGuuAAk/AJDT63RCAA0SiqFP/IThfbaHl2ewSf+CPsppdTrp6zNK6NJDSINIfUAc+1vlGT0hdOUo4dA13033tALHrXASivvM6YTeGKlaubgGUqLEWxLCn8bWNCtwngyvbT25yZxOs7gnFo4YIL+TK/jz7YnBb/wVOBGIa7ag2lOsXJsYRGGmlnnVLLP+lhMhJIz8m0QXFSsXYs6QZugbWDvYZaK1gkOrcKYTf7lTUH1Om8nyYRTYKEoALfL9VtIyHOvET6hZudzuxXJhlL8/UwGrtF97BM6s0lPvZIjUJZOde+zhpcxMtQFdfiD8qudWQGRGoGyqVBzDmaNnCuBg1QCBcGDgm657pUVlk3J9Xd3ZfOQug5Te/t2qAf6o3vke4hc4ckznVsM5iqducX1+Np+KJGVZTqYz2w1s3wQDrLXAtI2W+BUI9e41TGbdKiBsAYXiUqsixke+J2Qzn5hX1K5NxD3lqwpnVcDnyv5BtjurKIK8SzWztQqEOqYLIiEZWXRXAhw8zchVPWVnBE7+0zNdCJHFMxrACoCDXV0U0uznxosR8g+mwlzWrQ0yyh7ejgbtLSwAMs/2+Q/Z/GfHyf+Nuu45rZTsOItiwA4YZH4ramVDzKACCJbmc9M3UCCluEX5zBXh7J1pgswTkeS9d02Q0pnTWsbXxRy/r6o0aawywy/HHcKcNtETwAdzfbGk9Okvwsccv/2cHq5YLh837MRwKYbYlxv4OR8OI3HXq0uZSn1PSh+cQwjBa8hR7ozFvT5v3miN26XuncD77iObWgRLL0cfSv5xzgyx/d3dBzK2oWufz+f1RrGXPy6R2SmRL6Iw16wCZiPojKkgH58zwO4ebE8VciSEXu9/2DbKaBXMhjjnvZTSFtvI+CkSZOampHZD3LuViHupTIihKwBGLtR8IS0qEazLhnnHfiHNAHuQiME8BcybMdSIQIjxxIrq51LdvJ65TQIbF9arlqCEnrgpRm9mqKx80qb2PejWexYQsxsiEaM+rydvLBusKgBetYlK75WgAmb1H1wRBL9hZycGUQje5Mzoo1TjYHSqVIaYMw7ILJXUJXMhG/gRfq2Dz6mCszmpAho76CgBRqdOox4STomvK1u5wspEj90l+ahkiGFv76HB3+ETs3JtlLlCUJZqbuNHVQUBsLfXvI1pCAXYWRZluqm62DbjdJxgLxBeGKspcWoCTiN5PIiwBxS/fbC8hEswArVd2fnBqHi5HuuCgnK2IfpghPIavmqjNhJb+6k4AU6nxyyHEQZocBgtKMFMFid29tM9dp5MaQRpsZ4C6l7KPNQlEPYZNMdyKcx8QKWDGGHfu7oWo6UVA5dFn62DzR47MKfUWCmwrNqZmWcaBtvAZmHOshOnMPMB7ZeYMZKQdWpBHheAFDOSXNi5slF8QCVWp4vsAFVzE9dBCvh2yKylNUYiBLFp9kFflOoAELlFGa2Lt0RDJw/+LgwPWzX+BNiRRzv3fz9VB2lDs2sPwSFKOHR/rBmOxuNRq/qucuTR/cHGDYBZs1sTaCcd8t3Pw+Q8nvZ2M9JPpSSxf4/hnoEkXAcnBZh/xG9uiOrn3T9ee4jab01vTNEeOJ2aZ+/8cY6l7s0vkCWA0HenRya8QOgxvTFVsx/ACHTnRKcsAJo426sa/gmExVOiEAfA9hvTG1MlbTKnU9GrKJ3VcZwTwCMh5yOAvlzRn3IM8NbCWTLJ/jmGolcxycpnVpzRfO0jgL584Q9RBthu5SQpzDGnU+GknAiE0JLzixMU0JfX5ovrWwb4n6XrcWmRebk0i/M8FAiRx8rwKRantRefGrFgvh0AbyxejoeVf45B/didhxK2SZ++dxW78VJCZUZMxFkE/5hQTyuvJCtNuNmAKmRbOM5B4NNwcXUppgDe2rBSVZNOgCjBSQ9WDKVEUaguwWAq/GGA7WbUmiqKfdHXQdopfEZDaNGJ/tcU0EMnPyHO3kELZ8I7WlRq9AQxCYQWHbGtEQ6rgHFL2nkoYVFxWaRUQtmSdoJAGBfUQaY9blveRppXvHipyBk9y+JItqQZhTCoAv6xMW0jzStOpzNwOh3JlrRCCT2e27waQcvniWKF2Tyo+Cmt66UeJvsBaRSLzHiWERYB2tlFmYTtDs1taDEhANpaT1Q0z7ooPaxDtqQBhdDOaeKeIs9Vv2jGkpV3TgO0KjFTUekjxTH6bMb0fzlk+DqvAt7amfq+J5mZ7qkh1mSbbyKnvYN/7EwLP5CU0Vz3M2nzumosGtcAb2yeJe5LSKuW5sHaU5O6qnAdL4yilqV/8ZKOajXPtilbJ4Lxwjx4W+UAKkoXmdINMwbzHo8GaG1KhkPSqQrY9fnzeVrS+1xCjA6gag/12L1OKychfTrYpRASxmNde0SGE9G8x6uuRdv/PIE3sFhSZqbguu/vP0zLfIEcTlzf+DxeFbD99r8nFEBFcuaX5rrv7+8+PzhOy8hbY8FoDgyxCmD7rWmuQ3MlZzTXPXi2lxYOjiuGUkhc527yPm8BsN2TCz6tDlqQIGVeaa57xdK8dHgZlB+5PHEdPfmZh9R2UQRziacygpZW+rxb4VMNv+AXvTq8PA4GE4lYLJZIBIPX0auTn1ACZdL4bqNPGw8kH5z3FwEqbspeZgJ6W9AQKxBqgB7v7c3TfP0eajh9sFAcwU44dgwYwSfT9xDQ483fRG3/jDciOXh5uKTgVQCkmwriueunNztUlJQ4vly4AK9ob2lAwKN0wb8qesUSYnLw+PDqguHd5fN5ffmbXDSYiD3VqQErQRgm42fw8vLq6uTi4ifRxclJLnpJAhezzv1TFQnFqvbDOHLkyJEjR44cOXLkyJEjR44cOXLkyJEjR44cOTJf/wNAqQ/+9+B3KgAAAABJRU5ErkJggg=="
              className="mx-auto h-10 w-auto"
            />
            <h2 data-testid='heading' className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              {heading }
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={loginAction} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                    Password
                  </label>
                  
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                   
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }
  