import { useEffect, useState } from "react";
import { getAssignedClaims, markPickedUp, markDelivered } from "../../services/claimService";
import "./volunteerdashboard.css";

const VolunteerDashboard = () => {

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadAssignments = async () => {
    try {
      setLoading(true);
      const res = await getAssignedClaims();
      setAssignments(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load assignments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssignments();
  }, []);

  const handleMarkPickedUp = async (claimId) => {
    try {
      await markPickedUp(claimId);
      loadAssignments();
    } catch (err) {
      console.error(err);
      alert("Failed to mark as picked up");
    }
  };

  const handleMarkDelivered = async (claimId) => {
    try {
      await markDelivered(claimId);
      loadAssignments();
    } catch (err) {
      console.error(err);
      alert("Failed to mark as delivered");
    }
  };

  return (

    <div className="container mt-4">

      <h3>Volunteer Dashboard</h3>

      {loading && <p>Loading...</p>}

      {!loading && assignments.length === 0 && (
        <div className="text-center mt-5">
          <div className="alert alert-info">
            <h5>No deliveries assigned yet</h5>
            <p>You will see your assigned deliveries here once they are available.</p>
          </div>
        </div>
      )}

      <div className="row">

        {assignments.map(claim => (

          <div className="col-md-4 mb-4" key={claim._id}>

            <div className="card">

              <div className="card-body">

                <h5>{claim.donation?.foodTitle}</h5>

                <p>Quantity: {claim.quantity}</p>
                <p>Pickup: {claim.donation?.location}</p>
                <p>Receiver: {claim.receiver?.name}</p>
                

                {claim.status === "assigned" && (

                  <button
                    className="btn btn-primary w-100"
                    onClick={() => handleMarkPickedUp(claim._id)}
                  >
                    Mark Picked Up
                  </button>

                )}

                {claim.status === "picked_up" && (

                  <button
                    className="btn btn-success w-100"
                    onClick={() => handleMarkDelivered(claim._id)}
                  >
                    Mark Delivered
                  </button>

                )}

                {claim.status === "delivered" && (
                  <div className="alert alert-success text-center mb-0">
                    <strong>✓ Completed</strong>
                  </div>
                )}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

};

export default VolunteerDashboard;