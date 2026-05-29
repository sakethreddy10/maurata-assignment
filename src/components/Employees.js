import React, { useState, useEffect } from 'react';
import { formatSalary, formatDistance, formatDate } from '../utils/formatters';
import ConfirmModal from './ConfirmModal';

const Employees = ({ backgroundMedia }) => {
  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [targetEmployee, setTargetEmployee] = useState(null);

  // Auto-update distance every 2 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setEmployees(prev => prev.map(emp => ({
        ...emp,
        distance: emp.distance + 80,
        updatedTime: new Date().toISOString()
      })));
    }, 2 * 60 * 1000); // 2 minutes

    return () => clearInterval(interval);
  }, []);

  const addEmployee = () => {
    const newEmployee = {
      id: Date.now(),
      name: '',
      salary: '',
      gender: '',
      distance: 500, // Initial distance in meters
      updatedTime: new Date().toISOString()
    };
    setEmployees([...employees, newEmployee]);
    setEditingId(newEmployee.id);
    setEditData(newEmployee);
  };

  const startEdit = (employee) => {
    setEditingId(employee.id);
    setEditData({ ...employee });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
    // Remove empty employee if it was just added
    setEmployees(prev => prev.filter(emp => 
      emp.name.trim() !== '' || emp.salary !== '' || emp.gender !== ''
    ));
  };

  const saveEdit = () => {
    // Validate
    const errors = validateEmployee(editData);
    if (Object.keys(errors).length > 0) {
      alert('Please fix the following errors:\n' + Object.values(errors).join('\n'));
      return;
    }

    setEmployees(prev => prev.map(emp => 
      emp.id === editingId 
        ? { ...editData, updatedTime: new Date().toISOString() }
        : emp
    ));
    setEditingId(null);
    setEditData({});
  };

  const validateEmployee = (data) => {
    const errors = {};
    
    if (!data.name || data.name.trim().length < 3) {
      errors.name = 'Name must be at least 3 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(data.name.trim())) {
      errors.name = 'Name should contain only alphabets and spaces';
    }
    
    if (!data.salary || data.salary <= 0) {
      errors.salary = 'Salary must be a positive number';
    }
    
    if (!data.gender) {
      errors.gender = 'Gender is required';
    }
    
    return errors;
  };

  const handleEditChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const confirmDelete = (employee) => {
    setTargetEmployee(employee);
    setModalAction('delete');
    setShowModal(true);
  };

  const confirmCopy = (employee) => {
    setTargetEmployee(employee);
    setModalAction('copy');
    setShowModal(true);
  };

  const handleModalConfirm = () => {
    if (modalAction === 'delete') {
      setEmployees(prev => prev.filter(emp => emp.id !== targetEmployee.id));
    } else if (modalAction === 'copy') {
      const copiedEmployee = {
        ...targetEmployee,
        id: Date.now(),
        updatedTime: new Date().toISOString()
      };
      setEmployees(prev => [...prev, copiedEmployee]);
    }
    setShowModal(false);
    setTargetEmployee(null);
    setModalAction(null);
  };

  const handleModalCancel = () => {
    setShowModal(false);
    setTargetEmployee(null);
    setModalAction(null);
  };

  return (
    <div className="employee-section">
      <h2>Employee Management</h2>
      
      <button className="add-employee-btn" onClick={addEmployee}>
        Add Employee
      </button>

      <table className={`employee-table ${backgroundMedia ? 'transparent' : ''}`}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Salary</th>
            <th>Gender</th>
            <th>Distance Covered</th>
            <th>Updated Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>
                {editingId === employee.id ? (
                  <input
                    type="text"
                    value={editData.name || ''}
                    onChange={(e) => handleEditChange('name', e.target.value)}
                    placeholder="Enter name"
                  />
                ) : (
                  employee.name
                )}
              </td>
              <td>
                {editingId === employee.id ? (
                  <input
                    type="number"
                    value={editData.salary || ''}
                    onChange={(e) => handleEditChange('salary', Number(e.target.value))}
                    placeholder="Enter salary"
                    min="1"
                  />
                ) : (
                  <span className={employee.salary > 50000 ? 'salary-high' : ''}>
                    {formatSalary(employee.salary)}
                  </span>
                )}
              </td>
              <td>
                {editingId === employee.id ? (
                  <select
                    value={editData.gender || ''}
                    onChange={(e) => handleEditChange('gender', e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  employee.gender
                )}
              </td>
              <td>
                <span className={employee.distance > 2000 ? 'distance-alert' : ''}>
                  {formatDistance(employee.distance)}
                </span>
              </td>
              <td>{formatDate(employee.updatedTime)}</td>
              <td>
                <div className="actions">
                  {editingId === employee.id ? (
                    <>
                      <button className="action-btn save-btn" onClick={saveEdit}>
                        Save
                      </button>
                      <button className="action-btn cancel-btn" onClick={cancelEdit}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        className="action-btn edit-btn" 
                        onClick={() => startEdit(employee)}
                      >
                        Edit
                      </button>
                      <button 
                        className="action-btn delete-btn" 
                        onClick={() => confirmDelete(employee)}
                      >
                        Delete
                      </button>
                      <button 
                        className="action-btn copy-btn" 
                        onClick={() => confirmCopy(employee)}
                      >
                        Copy
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {employees.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '2rem', color: '#666' }}>
          No employees added yet. Click "Add Employee" to get started.
        </p>
      )}

      {showModal && (
        <ConfirmModal
          message={
            modalAction === 'delete' 
              ? 'Are you sure you want to delete this employee record?'
              : 'Are you sure you want to copy this employee record?'
          }
          onConfirm={handleModalConfirm}
          onCancel={handleModalCancel}
        />
      )}
    </div>
  );
};

export default Employees;