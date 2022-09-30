import { useState } from 'react';
import { useFormik } from 'formik';
import useAuth from '../../../hooks/useAuth';
import { hotelSchema } from '../../../schemas/formSchemas';
import Input from '../../../components/Input/Input';
import LoadingButton from '../../../components/UI/LoadingButton/LoadingButton';

export default function HotelForm(props) {
  const [auth] = useAuth()
  const [loading, setLoading] = useState(false);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: props.hotel.name || '',
      description: props.hotel.description || '',
      city: props.hotel.city || '',
      rooms: props.hotel.rooms,
      features: props.hotel.features || [],
      status: props.hotel.status || false
    },
    validationSchema: hotelSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        props.onSubmit({
          name: values.name,
          description: values.description,
          city: values.city,
          rooms: values.rooms,
          features: values.features,
          status: values.status,
          user_id: auth.userId
        })
      } catch (ex) {
        console.log(ex.response)
      }
      setLoading(false);
      //console.log(values)
    }
  })
  
  return (
    <form onSubmit={handleSubmit}>

      <Input
        label="Nazwa"
        type="text"
        id="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.name}
        touch={touched.name}
        placeholder="Podaj nazwę hotelu..." />

      <Input
        label="Opis"
        type="textarea"
        id="description"
        value={values.description}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.description}
        touch={touched.description}
        placeholder="Podaj opis hotelu..." />

      <Input
        label="Miejscowość"
        type="text"
        id="city"
        value={values.city}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.city}
        touch={touched.city}
        placeholder="Podaj miejscowość hotelu..." />

      <Input
        label="Pokoje"
        type="select"
        id="rooms"
        value={values.rooms}
        onChange={handleChange}
        onBlur={handleBlur}
        options={[
          { value: 1, label: 1 },
          { value: 2, label: 2 },
          { value: 3, label: 3 },
          { value: 4, label: 4 },
        ]}
        error={errors.rooms}
        touch={touched.rooms}
        placeholder="Podaj ilość pokoi..." />

      <Input
        label="Udogodnienia"
        type="checkbox"
        id="features"
        name="features"
        value={values.features}
        onChange={handleChange}
        onBlur={handleBlur}
        options={[
          { value: 'tv', label: 'TV'},
          { value: 'wifi', label: 'Wi-Fi'},
          { value: 'parking', label: 'Parking'},
        ]} />

      {/* <h6 className="text-lg font-bold dark:text-white">Zdjęcie</h6>
      <Input 
        type="file" 
        onChange={val => changeHandler(val, 'image')}
        error={form.image.error}
        showError={form.image.showError} /> */}
    
      <Input
        label="Status"
        type="switch"
        id="status"
        value={values.status}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.status}
        touch={touched.status} />

      <LoadingButton 
        loading={loading} 
        className="btn-success">
          {props.buttonText}
      </LoadingButton>

    </form>
  )
}