import { useForm } from 'react-hook-form';
import CustomNavbar from './CustomNavbar';
import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Assets/style.css';

const AddSchool = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    contact: '',
    email_id: '',
    name: '',
    state: '',
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = async () => {

    const formDataWithImage = new FormData();
    Object.keys(formData).forEach(key => {
      formDataWithImage.append(key, formData[key]);
    });
    formDataWithImage.append('image', image);

    try {
      const response = await axios.post('http://localhost:8081/school/formSubmit', formDataWithImage, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('Form submitted successfully!');
    } catch (err) {
      toast.error('Error submitting form. Please try again.');
    }
  };

  return (
    <>
      <CustomNavbar />
      <div className="form-body py-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 style={{ textAlign: "center" }}>Add School</h1>
          <div>
            <label>Name:</label>
            <input {...register('name', { required: true })} onChange={handleChange} />
            {errors.name && <span>This field is required</span>}
          </div>
          <div>
            <label>Address:</label>
            <input {...register('address', { required: true })} onChange={handleChange} />
            {errors.address && <span>This field is required</span>}
          </div>
          <div>
            <label>City:</label>
            <input {...register('city', { required: true })} onChange={handleChange} />
            {errors.city && <span>This field is required</span>}
          </div>
          <div>
            <label>State:</label>
            <input {...register('state', { required: true })} onChange={handleChange} />
            {errors.state && <span>This field is required</span>}
          </div>
          <div>
            <label>Contact:</label>
            <input
              type="tel"
              {...register('contact', {
                required: 'Contact is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Contact must be a 10-digit number',
                },
              })}
              onChange={handleChange}
            />
            {errors.contact && <span>{errors.contact.message}</span>}
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              {...register('email_id', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Invalid email address',
                },
              })}
              onChange={handleChange}
            />
            {errors.email_id && <span>{errors.email_id.message}</span>}
          </div>
          <div>
            <label>Image:</label>
            <input type="file" onChange={handleImageChange} accept="image/*" />
            {errors.image && <span>This field is required</span>}
          </div>
          <button type="submit">Submit</button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default AddSchool;
