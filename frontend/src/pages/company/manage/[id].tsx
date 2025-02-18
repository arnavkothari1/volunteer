import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/CompanyManage.module.css';
import EditCompanyModal from '@/components/EditCompanyModal';
import { type Company as CompanyType, Internship } from '@/types';

interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: string;
  priority: string;
}

interface Company {
  id: string;
  name: string;
  description: string;
  userPosition: string;
  location: string;
  interests: string[];
  isRemote: boolean;
  occupiedPositions: string[];
  internships?: Internship[];
  tasks?: Task[];
}

interface Application {
  id: string;
  education: string;
  experience: string;
  skills: string;
  whyJoinUs: string;
  status: string;
  contactEmail: string;
  contactPhone: string;
  internshipId: string;
  userId: string;
}

interface Props {
  company: CompanyType;
  // ... other props
}

const CompanyManagement = () => {
  const router = useRouter();
  const { id } = router.query;
  const [company, setCompany] = useState<Company | null>(null);
  const [activeTab, setActiveTab] = useState('internships');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showApplicants, setShowApplicants] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);

  useEffect(() => {
    const fetchCompany = async () => {
      if (!id) return;

      try {
        const response = await fetch(`http://localhost:5000/api/company/${id}`, {
          credentials: 'include',  // Important: Include credentials
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch company');
        }

        const data = await response.json();
        setCompany(data);
      } catch (error) {
        console.error('Error fetching company:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [id]);

  const fetchApplications = async () => {
    try {
      console.log('Fetching applications for company:', id);
      const response = await fetch(`http://localhost:5000/api/applications/company/${id}`, {
        credentials: 'include' // Important: include cookies
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched applications:', data);
        setApplications(data);
      } else {
        console.error('Failed to fetch:', await response.text());
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const handleApplicationStatus = async (applicationId: string, status: 'ACCEPTED' | 'REJECTED', message: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/applications/${applicationId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ status, message })
      });

      if (!response.ok) {
        throw new Error('Failed to update application status');
      }

      // Update local state to reflect the change
      setApplications(applications.map(app => 
        app.id === applicationId 
          ? { ...app, status, statusMessage: message }
          : app
      ));

    } catch (error) {
      console.error('Error updating application:', error);
      alert('Failed to update application status');
    }
  };

  const toggleApplicants = () => {
    setShowApplicants(!showApplicants);
  };

  const renderApplications = (applications: any[]) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {applications.map((application) => (
          <div key={application.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Header with status */}
            <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
              <h3 className="font-semibold text-lg">{application.internship.title}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                application.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' :
                application.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {application.status}
              </span>
            </div>

            {/* Applicant details */}
            <div className="p-4">
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-500">Applicant</h4>
                <p className="text-gray-900">{application.user.firstName} {application.user.lastName}</p>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-500">Cover Letter</h4>
                <p className="text-gray-900 whitespace-pre-wrap">{application.coverLetter}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Skills</h4>
                  <ul className="list-disc pl-4 text-gray-900">
                    {application.skills.items.map((skill: string, index: number) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Requirements Met</h4>
                  <ul className="list-disc pl-4 text-gray-900">
                    {application.requirements.items.map((req: string, index: number) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-500">Contact Information</h4>
                <p className="text-gray-900">{application.contactEmail}</p>
                <p className="text-gray-900">{application.contactPhone}</p>
              </div>

              <div className="text-sm text-gray-500">
                Applied: {new Date(application.createdAt).toLocaleDateString()}
              </div>
            </div>

            {/* Action buttons */}
            {application.status === 'PENDING' && (
              <div className="px-4 py-3 bg-gray-50 border-t flex justify-end space-x-2">
                <button
                  onClick={() => {
                    const message = prompt('Add a message for the applicant (optional):');
                    handleApplicationStatus(
                      application.id,
                      'ACCEPTED',
                      message || 'Your application has been accepted!'
                    );
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Accept
                </button>
                <button
                  onClick={() => {
                    const message = prompt('Add a message for the applicant (optional):');
                    handleApplicationStatus(
                      application.id,
                      'REJECTED',
                      message || 'Thank you for your interest.'
                    );
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  if (loading) return <div>Loading...</div>;
  if (!company) return <div>Company not found</div>;

  return (
    <div className={styles.container}>
      {company && (
        <>
          <div className={styles.companyHeader}>
            <div className={styles.companyInfo}>
              <h1>{company.name}</h1>
              <p className={styles.description}>{company.description}</p>
              <div className={styles.metaInfo}>
                <div className={styles.metaItem}>
                  <span className={styles.label}>Location:</span>
                  <span>{company.location} {company.isRemote ? '(Remote Available)' : ''}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.label}>Your Position:</span>
                  <span>{company.userPosition}</span>
                </div>
              </div>
              <div className={styles.tags}>
                {company.interests.map((interest) => (
                  <span key={interest} className={styles.tag}>{interest}</span>
                ))}
              </div>
            </div>
            <button 
              onClick={() => setShowEditModal(true)}
              className={styles.editButton}
            >
              Edit Company
            </button>
          </div>

          <div className={styles.tabsContainer}>
            <div className={styles.tabs}>
              <button
                className={`${styles.tab} ${activeTab === 'internships' ? styles.active : ''}`}
                onClick={() => setActiveTab('internships')}
              >
                Internships
              </button>
              <button
                className={`${styles.tab} ${activeTab === 'tasks' ? styles.active : ''}`}
                onClick={() => setActiveTab('tasks')}
              >
                Tasks
              </button>
            </div>
            <div className={styles.actionButton}>
              {activeTab === 'internships' ? (
                <button 
                  onClick={() => router.push(`/company/${id}/internship/create`)}
                  className={styles.createButton}
                >
                  Create New Internship
                </button>
              ) : (
                <button 
                  onClick={() => router.push(`/company/${id}/task/create`)}
                  className={styles.createButton}
                >
                  Create New Task
                </button>
              )}
            </div>
          </div>

          <div className={styles.content}>
            {activeTab === 'internships' ? (
              <div className={styles.internshipsList}>
                {company.internships?.map((internship) => (
                  <div key={internship.id} className={styles.card}>
                    <h3>{internship.title}</h3>
                    <p>{internship.description}</p>
                    <div className={styles.cardDetails}>
                      <div className={styles.requirements}>
                        <h4>Requirements:</h4>
                        <ul>
                          {internship.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                      <div className={styles.skills}>
                        <h4>Skills:</h4>
                        <ul>
                          {internship.skills.map((skill, index) => (
                            <li key={index}>{skill}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className={styles.cardFooter}>
                      <span className={styles.status}>{internship.status}</span>
                      <button 
                        className={styles.viewApplicantsButton}
                        onClick={() => {
                          setSelectedInternship(internship);
                          fetchApplications();
                        }}
                      >
                        View Applications
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.tasksList}>
                {company.tasks?.map((task) => (
                  <div key={task.id} className={styles.card}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <div className={styles.taskMeta}>
                      <span className={styles.deadline}>
                        Due: {new Date(task.deadline).toLocaleDateString()}
                      </span>
                      <span className={`${styles.status} ${styles[task.status.toLowerCase()]}`}>
                        {task.status}
                      </span>
                      <span className={`${styles.priority} ${styles[task.priority.toLowerCase()]}`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {showEditModal && (
            <EditCompanyModal 
              company={company}
              onClose={() => setShowEditModal(false)}
              onSave={() => {}}
            />
          )}

          <div className="mt-6">
            <button 
              onClick={toggleApplicants}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {showApplicants ? 'Hide Applicants' : 'View Applicants'}
            </button>

            {showApplicants && (
              <div className="mt-4">
                <h3>Applications</h3>
                {loading ? (
                  <p>Loading applications...</p>
                ) : error ? (
                  <p>Error: {error}</p>
                ) : applications.length > 0 ? (
                  renderApplications(applications)
                ) : (
                  <p>No applications yet</p>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CompanyManagement; 