import { useNavigate } from "react-router-dom";
import DonationForm from "../components/donations/DonationForm";
import { addDonation } from "../services/donationService";
import "./newdonation.css";

const NewDonation = () => {

  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await addDonation(data);
      alert("Donation created successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to create donation");
    }
  };

  return (
    <div className="container mt-4">

      <h3 className="mb-4">Create New Donation</h3>

      <div className="card">
        <div className="card-body">

          <DonationForm
            onSubmit={handleSubmit}
            onCancel={() => navigate("/dashboard")}
          />

        </div>
      </div>

    </div>
  );
};

export default NewDonation;