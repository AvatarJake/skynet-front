import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Popover, Transition } from '@headlessui/react';
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CubeIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import DotLoader from 'react-spinners/DotLoader';
import LogoImg from '@/components/LogoImg';
import DarkModeButton from '@/components/DarkModeButton.jsx';
import GlobeButton from '@/components/GlobeButton';

const products = [
  {
    name: 'Agregar Usuario',
    description:
      'Agrega nuevos usuarios desde aqui.',
    href: '/users/add',
    icon: CubeIcon,
  },

  {
    name: 'Listado de Usuarios',
    description: 'Visualiza de manera general el listado de los usuarios',
    href: '/users/list',
    icon: FingerPrintIcon,
  },

];
const callsToAction = [

];


const clientes = [
    {
      name: 'Agregar Cliente',
      description:
        'Agrega nuevos clientes desde aqui.',
      href: '/clientes/add',
      icon: CubeIcon,
    },
    
    {
      name: 'Listado de Clientes',
      description: 'Visualiza de manera general el listado de los clientes',
      href: '/clientes/list',
      icon: FingerPrintIcon,
    },
  ];

  const visitas = [
    {
      name: 'Agregar Visita',
      description:
        'Programa una nueva visita.',
      href: '/visitas/add',
      icon: CubeIcon,
    },

    {
      name: 'Listado de Visitas',
      description: 'Visualiza de manera general el listado de visitas',
      href: '/visitas/list',
      icon: FingerPrintIcon,
    },

  ];

export default function Navbar() {
  
  const router = useRouter();
  const [token, setToken]= useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const firstName = localStorage.getItem('user');
    const role = localStorage.getItem('role');
    
    console.log('token:' , token)
    console.log('nombresito:' , firstName)
    console.log('que hace:' , role)
    setRole(role)
    setFirstName(firstName)
    
  })

    
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.setItem('token', '');
    localStorage.setItem('role', '');
    localStorage.setItem('user', '')
  };
  
  
  console.log(token)

  return (
    <header className="">
      <nav
        className="mx-auto flex max-w-7xl items-center  justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Skynet</span>
            <LogoImg />
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 dark:text-dark-txt text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon
              className="h-6 w-6 dark:text-dark-txt dark:hover:text-dark-accent"
              aria-hidden="true"
            />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-8">
        {(role==='Admin' || role === 'administrador' || role === 'supervisor')  &&(
        <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-md font-medium leading-6 focus:outline-none focus:ring-none dark:hover:text-dark-primary dark:text-dark-txt focus:dark:text-dark-primary focus:text-cyan-600 hover:text-cyan-600 text-gray-900">
              Usuarios
              <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >

              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-xl overflow-hidden rounded-3xl dark:bg-dark-second bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex gap-x-6 rounded-lg p-4 text-md leading-6 dark:hover:bg-dark-third hover:bg-gray-50"
                    >
                      <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg dark:bg-dark-third bg-gray-50 dark:group-hover:bg-dark-second group-hover:bg-white">
                        <item.icon
                          className="h-6 w-6 text-gray-600 dark:group-hover:text-dark-primary group-hover:text-iris-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <Link
                          href={item.href}
                          className="block font-semibold dark:text-dark-txt hover:dark:text-dark-primary text-gray-900"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </Link>
                        <p className="mt-1 text-gray-600 dark:text-dark-txt-secondary">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 dark:bg-dark-second bg-gray-50">
                  {callsToAction.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-md font-semibold leading-6 dark:text-dark-txt dark:hover:text-dark-primary text-gray-900 dark:hover:bg-dark-third hover:bg-gray-100"
                    >
                      <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        )}
          {(role==='Admin' || role === 'administrador' || role === 'supervisor')  &&(
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-md font-medium leading-6 focus:outline-none focus:ring-none dark:hover:text-dark-primary dark:text-dark-txt focus:dark:text-dark-primary focus:text-cyan-600 hover:text-cyan-600 text-gray-900">
              Clientes
              <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-xl overflow-hidden rounded-3xl dark:bg-dark-second bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {clientes.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex gap-x-6 rounded-lg p-4 text-md leading-6 dark:hover:bg-dark-third hover:bg-gray-50"
                    >
                      <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg dark:bg-dark-third bg-gray-50 dark:group-hover:bg-dark-second group-hover:bg-white">
                        <item.icon
                          className="h-6 w-6 text-gray-600 dark:group-hover:text-dark-primary group-hover:text-iris-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <Link
                          href={item.href}
                          className="block font-semibold dark:text-dark-txt hover:dark:text-dark-primary text-gray-900"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </Link>
                        <p className="mt-1 text-gray-600 dark:text-dark-txt-secondary">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 dark:bg-dark-second bg-gray-50">
                  {callsToAction.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-md font-semibold leading-6 dark:text-dark-txt dark:hover:text-dark-primary text-gray-900 dark:hover:bg-dark-third hover:bg-gray-100"
                    >
                      <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
          )}

          {(role==='Admin' || role === 'administrador' || role === 'supervisor')  &&(
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-md font-medium leading-6 focus:outline-none focus:ring-none dark:hover:text-dark-primary dark:text-dark-txt focus:dark:text-dark-primary focus:text-cyan-600 hover:text-cyan-600 text-gray-900">
              Visitas
              <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-xl overflow-hidden rounded-3xl dark:bg-dark-second bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {visitas.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex gap-x-6 rounded-lg p-4 text-md leading-6 dark:hover:bg-dark-third hover:bg-gray-50"
                    >
                      <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg dark:bg-dark-third bg-gray-50 dark:group-hover:bg-dark-second group-hover:bg-white">
                        <item.icon
                          className="h-6 w-6 text-gray-600 dark:group-hover:text-dark-primary group-hover:text-iris-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <Link
                          href={item.href}
                          className="block font-semibold dark:text-dark-txt hover:dark:text-dark-primary text-gray-900"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </Link>
                        <p className="mt-1 text-gray-600 dark:text-dark-txt-secondary">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 dark:bg-dark-second bg-gray-50">
                  {callsToAction.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-md font-semibold leading-6 dark:text-dark-txt dark:hover:text-dark-primary text-gray-900 dark:hover:bg-dark-third hover:bg-gray-100"
                    >
                      <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
          )}
          
          {(role==='Admin' || role === 'administrador' || role === 'supervisor') &&(
          <Link
            href="/reportes/lista_reportes"
            className={`${
              router.pathname === '/podcast'
                ? 'text-cyan-600 dark:text-dark-primary'
                : 'dark:hover:text-dark-primary hover:text-cyan-600 text-gray-900 dark:text-dark-txt'
            } text-md font-medium leading-6    `}
          >
            Reportes
          </Link>
          )}

        {role==='tecnico' &&(
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-md font-medium leading-6 focus:outline-none focus:ring-none dark:hover:text-dark-primary dark:text-dark-txt focus:dark:text-dark-primary focus:text-cyan-600 hover:text-cyan-600 text-gray-900">
              Visitas
              <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-xl overflow-hidden rounded-3xl dark:bg-dark-second bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {visitas.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex gap-x-6 rounded-lg p-4 text-md leading-6 dark:hover:bg-dark-third hover:bg-gray-50"
                    >
                      <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg dark:bg-dark-third bg-gray-50 dark:group-hover:bg-dark-second group-hover:bg-white">
                        <item.icon
                          className="h-6 w-6 text-gray-600 dark:group-hover:text-dark-primary group-hover:text-iris-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <Link
                          href={item.href}
                          className="block font-semibold dark:text-dark-txt hover:dark:text-dark-primary text-gray-900"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </Link>
                        <p className="mt-1 text-gray-600 dark:text-dark-txt-secondary">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 dark:bg-dark-second bg-gray-50">
                  {callsToAction.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-md font-semibold leading-6 dark:text-dark-txt dark:hover:text-dark-primary text-gray-900 dark:hover:bg-dark-third hover:bg-gray-100"
                    >
                      <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
          )}

        </Popover.Group>
        <div className="hidden xl:flex xl:flex-1 xl:justify-end space-x-2">
          <DarkModeButton />
          <Link
            onClick={handleLogout}
            href="/login"
            className="inline-flex items-center gap-x-2 rounded-md bg-yellow-500 px-3.5 py-2.5 text-md font-semibold text-white shadow-sm transition duration-300 ease-in-out hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
          >
            Cerrar Sesion
            <DotLoader className=" h-5 w-5" loading size={20} color="#f2f2f2" />
          </Link>
        </div>

      </nav>

      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 flex w-full flex-col justify-between overflow-y-auto dark:bg-dark-second bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Skynet</span>
                <LogoImg />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 dark:text-dark-txt dark:hover:text-dark-accent text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {products.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="group -mx-3 flex items-center gap-x-6 rounded-lg p-3 text-base font-semibold leading-7 dark:text-dark-txt dark:hover:text-dark-primary text-gray-900 dark:hover:bg-dark-third hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg dark:bg-dark-third dark:group-hover:bg-dark-second bg-gray-50 group-hover:bg-white">
                        <item.icon
                          className="h-6 w-6 text-gray-600 dark:group-hover:text-dark-primary group-hover:text-iris-600"
                          aria-hidden="true"
                        />
                      </div>
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
      <div style={{ color: 'blue', fontSize: '20px', fontWeight: 'bold' }}>
        Bienvenido {firstName}
      </div>
      {(role==='Admin' || role === 'administrador') &&(
      <div class="barra-superior">
      <a href="https://msloginapi.azurewebsites.net/admin/" class="boton">Administración de Usuarios</a>
      <a href="https://msclientesapi.azurewebsites.net/admin/" class="boton">Administración de Clientes</a>
      <a href="https://msvisitasapi.azurewebsites.net/admin/" class="boton">Administración de Visitas</a>
    </div> 
  )} 
    </header>
    
  );
  
}
