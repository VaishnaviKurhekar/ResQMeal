import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getMe } from "../../services/authService";
import "./donationform.css";

const DonationForm = ({ onSubmit, onCancel, initialData }) => {
  const { user: authUser } = useAuth();

  const emptyForm = {
    foodTitle: "",
    category: "cooked",
    totalQuantity: "",
    unit: "kg",
    location: "",//auto-filled from user profile but editable
    expiryTime: "",
    pickupTime: "",
    contactName: "", //auto-filled from user profile but editable
    contactPhone: "",//auto-filled from user profile but editable
    notes: "",
  };

  const [form, setForm] = useState(emptyForm);

  // Load data when editing or auto-fill for new donations
  useEffect(() => {
    const loadFormData = async () => {
      if (initialData) {
        setForm(initialData);
      } else if (authUser) {
        // Auto-fill contact info for new donations
        try {
          const res = await getMe();
          const userProfile = res.data;
          setForm({
            ...emptyForm,
            contactName: userProfile.contactName || userProfile.name || "",
            contactPhone: userProfile.contactPhone || "",
            location: userProfile.location || "",
          });
        } catch (error) {
          console.error("Failed to load user profile:", error);
          // Fallback to auth user name
          setForm({
            ...emptyForm,
            contactName: authUser.name || "",
          });
        }
      }
    };

    loadFormData();
  }, [initialData, authUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // basic validation
    if (!form.foodTitle || !form.totalQuantity || !form.location || !form.expiryTime) {
      alert("Please fill all required fields");
      return;
    }

    onSubmit(form);
    setForm(emptyForm);
  };

  const handleCancel = () => {
    setForm(emptyForm);
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-3">

        {/* Food Title */}
        <div className="col-md-6">
          <label className="form-label">Food Name *</label>
          <input
            type="text"
            className="form-control"
            name="foodTitle"
            value={form.foodTitle}
            onChange={handleChange}
            required
          />
        </div>

        {/* Category */}
        <div className="col-md-6">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="cooked">Cooked</option>
            <option value="raw">Raw</option>
            <option value="packaged">Packaged</option>
            <option value="bakery">Bakery</option>
            <option value="dairy">Dairy</option>
            <option value="fruits_vegetables">Fruits & Vegetables</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Total Quantity */}
        <div className="col-md-4">
          <label className="form-label">Quantity *</label>
          <input
            type="number"
            min="1"
            className="form-control"
            name="totalQuantity"
            value={form.totalQuantity}
            onChange={handleChange}
            required
          />
        </div>

        {/* Unit */}
        <div className="col-md-2">
          <label className="form-label">Unit</label>
          <select
            className="form-select"
            name="unit"
            value={form.unit}
            onChange={handleChange}
          >
            <option value="kg">Kg</option>
            <option value="plates">Plates</option>
            <option value="boxes">Boxes</option>
          </select>
        </div>

        {/* Expiry Time */}
        <div className="col-md-6">
          <label className="form-label">Expiry Date & Time *</label>
          <input
            type="datetime-local"
            className="form-control"
            name="expiryTime"
            min={new Date().toISOString().slice(0, 16)}
            value={form.expiryTime}
            onChange={handleChange}
            required
          />
        </div>

        {/* Pickup Time */}
        <div className="col-md-6">
          <label className="form-label">Pickup Time</label>
          <input
            type="datetime-local"
            className="form-control"
            name="pickupTime"
            value={form.pickupTime}
            onChange={handleChange}
          />
        </div>

        {/* Location */}
        <div className="col-12">
          <label className="form-label">Pickup Location *</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
          />
        </div>

        {/* Contact Name */}
        <div className="col-md-6">
          <label className="form-label">Contact Name</label>
          <input
            type="text"
            className="form-control"
            name="contactName"
            value={form.contactName}
            onChange={handleChange}
          />
        </div>

        {/* Contact Phone */}
        <div className="col-md-6">
          <label className="form-label">Contact Phone</label>
          <input
            type="tel"
            className="form-control"
            name="contactPhone"
            value={form.contactPhone}
            onChange={handleChange}
          />
        </div>

        {/* Notes */}
        <div className="col-12">
          <label className="form-label">Notes</label>
          <textarea
            className="form-control"
            rows="3"
            name="notes"
            value={form.notes}
            onChange={handleChange}
          />
        </div>

      </div>

      {/* Buttons */}
      <div className="d-flex justify-content-end gap-2 mt-4">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-success">
          Save Donation
        </button>
      </div>
    </form>
  );
};

export default DonationForm;