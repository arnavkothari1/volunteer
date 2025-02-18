import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http } from 'msw'
import { setupServer } from 'msw/node'
import { ChakraProvider } from '@chakra-ui/react'
import { ProfileProvider } from '@/context/ProfileContext'
import App from '../../pages/_app'
import { Router } from 'next/router';

// Mock API responses
const server = setupServer(
  http.get('/api/profile', () => {
    return Response.json({
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      // ... other profile data
    })
  }),

  http.get('/api/applications', () => {
    return Response.json([
      {
        id: '1',
        position: 'Software Engineer',
        company: 'Tech Corp',
        status: 'applied',
        // ... other application data
      },
    ])
  }),

  // Add more API mocks as needed
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// Mock the Next.js router
const mockRouter = {
  route: '/',
  pathname: '/',
  query: {},
  asPath: '/',
  basePath: '',
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
} as unknown as Router;

const mockPageProps = {
  pageProps: {},
  Component: () => null,
  router: mockRouter,
};

describe('App Integration Tests', () => {
  test('full application flow', async () => {
    render(
      <ChakraProvider>
        <ProfileProvider>
          <App {...mockPageProps} />
        </ProfileProvider>
      </ChakraProvider>
    )

    // Test authentication
    await testAuthentication()

    // Test profile management
    await testProfileManagement()

    // Test application tracking
    await testApplicationTracking()

    // Test search functionality
    await testSearch()
  })
})

async function testAuthentication() {
  // Test login flow
  const loginButton = screen.getByRole('button', { name: /login/i })
  fireEvent.click(loginButton)

  const emailInput = screen.getByLabelText(/email/i)
  const passwordInput = screen.getByLabelText(/password/i)

  await userEvent.type(emailInput, 'test@example.com')
  await userEvent.type(passwordInput, 'password123')

  const submitButton = screen.getByRole('button', { name: /submit/i })
  fireEvent.click(submitButton)

  await waitFor(() => {
    expect(screen.getByText(/welcome/i)).toBeInTheDocument()
  })
}

async function testProfileManagement() {
  // Test profile editing
  const editProfileButton = screen.getByRole('button', { name: /edit profile/i })
  fireEvent.click(editProfileButton)

  const nameInput = screen.getByLabelText(/first name/i)
  await userEvent.clear(nameInput)
  await userEvent.type(nameInput, 'Jane')

  const saveButton = screen.getByRole('button', { name: /save/i })
  fireEvent.click(saveButton)

  await waitFor(() => {
    expect(screen.getByText('Jane')).toBeInTheDocument()
  })
}

async function testApplicationTracking() {
  // Test adding new application
  const newApplicationButton = screen.getByRole('button', {
    name: /new application/i,
  })
  fireEvent.click(newApplicationButton)

  const positionInput = screen.getByLabelText(/position/i)
  const companyInput = screen.getByLabelText(/company/i)

  await userEvent.type(positionInput, 'Senior Developer')
  await userEvent.type(companyInput, 'Tech Inc')

  const submitButton = screen.getByRole('button', { name: /submit/i })
  fireEvent.click(submitButton)

  await waitFor(() => {
    expect(screen.getByText('Senior Developer')).toBeInTheDocument()
    expect(screen.getByText('Tech Inc')).toBeInTheDocument()
  })

  // Test updating application status
  const statusSelect = screen.getByLabelText(/status/i)
  fireEvent.change(statusSelect, { target: { value: 'interviewing' } })

  await waitFor(() => {
    expect(screen.getByText(/interviewing/i)).toBeInTheDocument()
  })
}

async function testSearch() {
  // Test search functionality
  const searchInput = screen.getByPlaceholderText(/search/i)
  await userEvent.type(searchInput, 'software engineer')

  const searchButton = screen.getByRole('button', { name: /search/i })
  fireEvent.click(searchButton)

  await waitFor(() => {
    expect(screen.getByText(/results for/i)).toBeInTheDocument()
  })

  // Test filters
  const filterButton = screen.getByRole('button', { name: /filters/i })
  fireEvent.click(filterButton)

  const locationInput = screen.getByLabelText(/location/i)
  await userEvent.type(locationInput, 'Remote')

  const applyFiltersButton = screen.getByRole('button', { name: /apply/i })
  fireEvent.click(applyFiltersButton)

  await waitFor(() => {
    expect(screen.getByText(/remote/i)).toBeInTheDocument()
  })
} 