import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThreeDots } from 'react-loader-spinner';

const AdminDashboard = () => {
  const [config, setConfig] = useState({
    nacRewardPercentage: 0.005,
    daiRewardPercentage: 0.05,
    daiEarningDays: 1,
    duration: 5,
    referralPercentage: 0.10,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig({
      ...config,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      const response = await axios.put(
        'https://quiet-ravine-44147-35b8bde85fde.herokuapp.com/api/stake/update-staking-config',
        config
      );
      setMessage({ type: 'success', text: response.data.message });
    } catch (error) {
      setMessage({ type: 'error', text: 'Error updating staking configuration: ' + error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <nav
          id="sidebarMenu"
          className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
        >
          <div className="position-sticky pt-3">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  <i className="bi bi-house"></i> Admin Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="bi bi-file-earmark"></i> Withdrawal Request
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="bi bi-cart"></i> Support Tickets
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="bi bi-people"></i> Payments
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="bi bi-graph-up"></i> Reports
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="bi bi-graph-up"></i> Users
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="bi bi-graph-up"></i> Settings
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Admin Dashboard</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group me-2">
                <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
                <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
              </div>
              <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
                <span data-feather="calendar"></span>
                This week
              </button>
            </div>
          </div>

          {message.text && (
            <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'}`} role="alert">
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nacRewardPercentage" className="form-label">
                NAC Reward Percentage <small className='text-danger'>Please ensure that you use decimal for percentage</small>
              </label>
              <input
                type="number"
                className="form-control"
                id="nacRewardPercentage"
                name="nacRewardPercentage"
                value={config.nacRewardPercentage}
                onChange={handleChange}
                step="0.0001"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="daiRewardPercentage" className="form-label">
                DAI Reward Percentage - <small className='text-danger'>Please ensure that you use decimal for percentage</small>
              </label>
              <input
                type="number"
                className="form-control"
                id="daiRewardPercentage"
                name="daiRewardPercentage"
                value={config.daiRewardPercentage}
                onChange={handleChange}
                step="0.01"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="daiEarningDays" className="form-label">
                DAI Earning Days - <small className='text-danger'>Number of days before users get dai reward circle</small>
              </label>
              <input
                type="number"
                className="form-control"
                id="daiEarningDays"
                name="daiEarningDays"
                value={config.daiEarningDays}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="duration" className="form-label">
                Duration - <small className='text-danger'>Measure is days (30days = 1 month)</small>
              </label>
              <input
                type="number"
                className="form-control"
                id="duration"
                name="duration"
                value={config.duration}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="referralPercentage" className="form-label">
                Referral Percentage <small className='text-danger'>Please ensure that you use decimal for percentage</small>
              </label>
              <input
                type="number"
                className="form-control"
                id="referralPercentage"
                name="referralPercentage"
                value={config.referralPercentage}
                onChange={handleChange}
                step="0.01"
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <ThreeDots height="20" width="20" color="#fff" /> : 'Update Configuration'}
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
