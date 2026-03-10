import { useEffect, useState } from "react";
import API from "../../services/api";
import { getApprovedClaims, assignVolunteer } from "../../services/claimService";
import "./admindashboard.css";

const AdminDashboard = () => {

  const [tab, setTab] = useState("overview");
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [donations, setDonations] = useState([]);
  const [claims, setClaims] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= LOAD DATA ================= */

  const loadAll = async () => {
    try {
      setLoading(true);

      const [statsRes, usersRes, donationsRes, claimsRes, volunteersRes] =
        await Promise.all([
          API.get("/admin/stats"),
          API.get("/admin/users"),
          API.get("/admin/donations"),
          getApprovedClaims(),
          API.get("/admin/volunteers")
        ]);

      setStats(statsRes.data || {});
      setUsers(usersRes.data || []);
      setDonations(donationsRes.data || []);
      setClaims(claimsRes.data || []);
      setVolunteers(volunteersRes.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  /* ================= USER ACTIONS ================= */

  const approveUser = async (id) => {
    await API.put(`/admin/users/${id}/approve`);
    loadAll();
  };

  const suspendUser = async (id) => {
    await API.put(`/admin/users/${id}/suspend`);
    loadAll();
  };

  /* ================= DELETE DONATION ================= */

  const deleteDonation = async (id) => {
    if (!window.confirm("Delete this donation?")) return;
    await API.delete(`/admin/donations/${id}`);
    loadAll();
  };

  /* ================= ASSIGN VOLUNTEER ================= */

  const handleAssignVolunteer = async (claimId, volunteerId) => {
    if (!volunteerId) return;
    try {
      await assignVolunteer(claimId, volunteerId);
      loadAll();
    } catch (err) {
      console.error(err);
      alert("Volunteer assign failed");
    }
  };

  /* ================= VOLUNTEER ACTION ================= */

  const toggleVolunteer = async (id) => {
    await API.put(`/admin/volunteers/${id}/toggle`);
    loadAll();
  };

  return (

    <div className="container mt-4">

      <h3 className="mb-4">Admin Dashboard</h3>

      {/* ===== STATS ===== */}

      <div className="row mb-4">

        <Stat title="Users" value={stats.users || 0}/>
        <Stat title="Donations" value={stats.donations || 0}/>
        <Stat title="Volunteers" value={stats.volunteers || 0}/>
        <Stat title="Active Deliveries" value={stats.activeDeliveries || 0}/>

      </div>

      {/* ===== TABS ===== */}

      <ul className="nav nav-tabs mb-3">

        {["users","claims","donations","volunteers"].map((t)=>(
          <li className="nav-item" key={t}>
            <button
              className={`nav-link ${tab === t ? "active" : ""}`}
              onClick={()=>setTab(t)}
            >
              {t.toUpperCase()}
            </button>
          </li>
        ))}

      </ul>

      {loading && <p>Loading...</p>}

      {/* ================= USERS ================= */}

      {tab === "users" && (

        <table className="table table-bordered">

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {users.map((u)=>(
              <tr key={u._id}>

                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>

                <td>{u.status}</td>

                <td>

                  {u.status === "pending" && (
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={()=>approveUser(u._id)}
                    >
                      Approve
                    </button>
                  )}

                  {u.status === "active" && u.role !== "admin" && (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={()=>suspendUser(u._id)}
                    >
                      Suspend
                    </button>
                  )}

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      )}

      {/* ================= CLAIMS ================= */}

      {tab === "claims" && (

        <table className="table table-bordered">

          <thead>
            <tr>
              <th>Food</th>
              <th>Receiver</th>
              <th>Quantity</th>
              <th>Location</th>
              <th>Volunteer</th>
            </tr>
          </thead>

          <tbody>

            {claims.map(claim => (

              <tr key={claim._id}>

                <td>{claim.donation?.foodTitle}</td>

                <td>{claim.receiver?.name}</td>

                <td>{claim.quantity}</td>

                <td>{claim.donation?.location}</td>

                <td>

                  <select
                    className="form-select form-select-sm"
                    value={claim.volunteer || ""}
                    onChange={(e)=>handleAssignVolunteer(claim._id, e.target.value)}
                  >

                    <option value="">Assign Volunteer</option>

                    {volunteers.map(v=>(
                      <option key={v._id} value={v._id}>
                        {v.name}
                      </option>
                    ))}

                  </select>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

      {/* ================= DONATIONS ================= */}

      {tab === "donations" && (

        <table className="table table-bordered">

          <thead>
            <tr>
              <th>Food</th>
              <th>Donor</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {donations.map(d => (

              <tr key={d._id}>

                <td>{d.foodTitle}</td>

                <td>{d.donor?.name}</td>

                <td>{d.category}</td>

                <td>{d.remainingQuantity} / {d.totalQuantity} {d.unit}</td>

                <td>{d.status}</td>

                <td>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={()=>deleteDonation(d._id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

      {/* ================= VOLUNTEERS ================= */}

      {tab === "volunteers" && (

        <table className="table table-bordered">

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Deliveries</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {volunteers.map((v)=>(
              <tr key={v._id}>

                <td>{v.name}</td>
                <td>{v.email}</td>
                <td>{v.available ? "Available" : "Busy"}</td>
                <td>{v.completedDeliveries || 0}</td>

                <td>

                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={()=>toggleVolunteer(v._id)}
                  >
                    Toggle
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      )}

    </div>

  );

};

const Stat = ({ title,value }) => (

  <div className="col-md-3">

    <div className="card text-center">

      <div className="card-body">

        <h6>{title}</h6>
        <h3>{value}</h3>

      </div>

    </div>

  </div>

);

export default AdminDashboard;