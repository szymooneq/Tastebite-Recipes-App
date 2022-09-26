import Input from '../../../components/Input/Input';
import { validate } from '../../../helpers/validations';
import useAuth from '../../../hooks/useAuth';
import LoadingButton from '../../../components/UI/LoadingButton/LoadingButton';
import { useEffect, useState } from 'react';

export default function HotelForm(props) {
  const [auth] = useAuth()
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: {
      value: '',
      error: '',
      showError: false,
      rules: ['required', { rule: 'min', length: 4 }]
    },
    description: {
      value: '',
      error: '',
      showError: false,
      rules: ['required', { rule: 'min', length: 10 }]
    },
    city: {
      value: '',
      error: '',
      showError: false,
      rules: ['required']
    },
    rooms: {
      value: 2,
      error: '',
      showError: false,
      rules: ['required']
    },
    features: {
      value: [],
      error: '',
      showError: false
    },
    image: {
      value: null,
      error: '',
      showError: false
    },
    status: {
      value: true,
      error: '',
      showError: false,
      rules: ['required']
    }
  });

  useEffect(() => {
    const newForm = {...form}
    for (const key in props.hotel) {
      newForm[key].value = props.hotel[key]
    }
    setForm(newForm)
  }, [props.hotel])

  const changeHandler = (value, fieldName) => {
    const error = validate(form[fieldName].rules, value);
    setForm({
      ...form, 
      [fieldName]: {
        ...form[fieldName],
        value,
        showError: true,
        error: error
      } 
    });
  }

  const submit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      props.onSubmit({
        name: form.name.value,
        description: form.description.value,
        city: form.city.value,
        rooms: form.rooms.value,
        features: form.features.value,
        status: form.status.value,
        user_id: auth.userId
      })
    } catch (ex) {
      console.log(ex.response)
    }

    setLoading(false);
  }
  
  return (
    <form onSubmit={submit}>
      <Input
        label="Nazwa"
        id="name"
        value={form.name.value}
        onChange={val => changeHandler(val, 'name')}
        error={form.name.error}
        showError={form.name.showError} />

      <Input
        label="Opis"
        id="description"
        type="textarea"
        value={form.description.value}
        onChange={val => changeHandler(val, 'description')}
        error={form.description.error}
        showError={form.description.showError} />

      <Input
        label="Miejscowość"
        id="city"
        value={form.city.value}
        onChange={val => changeHandler(val, 'city')}
        error={form.city.error}
        showError={form.city.showError} />

      <Input
        label="Ilość pokoi"
        value={form.rooms.value}
        type="select"
        onChange={val => changeHandler(val, 'rooms')}
        options={[
          { value: 1, label: 1 },
          { value: 2, label: 2 },
          { value: 3, label: 3 },
          { value: 4, label: 4 },
        ]}
        error={form.rooms.error}
        showError={form.rooms.showError} />

      <div className="mb-3">
      <h6 class="text-lg font-bold dark:text-white">Udogodnienia</h6>
        <Input
          type="checkbox"
          value={form.features.value}
          onChange={val => changeHandler(val, 'features')}
          options={[
            { value: 'tv', label: 'TV'},
            { value: 'wifi', label: 'Wi-Fi'},
            { value: 'parking', label: 'Parking'},
          ]}
          error={form.features.error}
          showError={form.features.showError} />
      </div>
 
      <h6 class="text-lg font-bold dark:text-white">Zdjęcie</h6>
      <Input 
        type="file" 
        onChange={val => changeHandler(val, 'image')}
        error={form.image.error}
        showError={form.image.showError} />
      
      
      <h6 class="text-lg font-bold dark:text-white">Status</h6>
      <Input
        type="switch"
        name="status"
        value={form.status.value}
        onChange={val => changeHandler(!val, 'status')}
        error={form.status.error}
        showError={form.status.showError} />

      {/* <div className="mx-auto mb-4 w-96">
        <label htmlFor="default-toggle" className="inline-flex relative items-center cursor-pointer">
          <input type="checkbox" value="" id="default-toggle" className="sr-only peer" onChange={check} />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle me</span>
        </label>
      </div> */}

      <div className="float-end">
            <LoadingButton 
              loading={loading} 
              className="btn-success">
                {props.buttonText}
            </LoadingButton>
          </div>

    </form>
  )
}