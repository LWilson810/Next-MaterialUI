import { useCallback, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  styled,
  Checkbox
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import ResetPassword from '../auth/reset'
import { border } from '@mui/system';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const Login = (props) => {
  const router = useRouter();
  const auth = useAuth();
  const formik = useFormik({
    initialValues: {
      email: 'demo@devias.io',
      password: 'Password123!',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        await auth.signIn(values.email, values.password);
        router.push('/dashboard');
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  const [pass, setPass] = useState(false)

  const handleClickPassword = () => {
    props.gotoLogin()
    setPass(true)
  }

  const handleClosePassword = () => {
    setPass(false)
  }

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'black',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            width: '100%'
          }}
        >
          <div>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
                <FlexBox gap={1}>
                  <Checkbox
                    size="small"
                    name="remember"
                    // onChange={handleChange}
                    checked={formik.values.remember}
                    sx={{ padding: 0 }}
                  />

                  <div style={{ color: 'white' }}>Keep me logged i</div>
                </FlexBox>
              </Stack>

              {formik.errors.submit && (
                <Typography
                  color="error"
                  sx={{ mt: 3 }}
                  variant="body2"
                >
                  {formik.errors.submit}
                </Typography>
              )}
              <Button
                fullWidth
                size="large"
                sx={{ mt: 2, textTransform: 'uppercase', mb: 2, borderRadius: 10, backgroundColor: '#607BCC' }}
                type="submit"
                variant="contained"
              >
                log in
              </Button>
              <a onClick={handleClickPassword}
                style={{ color: '#607BCC', cursor: 'pointer' }}>
                FORGOT PASSWORD?
              </a>
              {/* <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ border: '1px solid white', width: '50%' }} />
                <span style={{ color: 'white', marginLeft: 5, marginRight: 5 }}>or</span>
                <div style={{ border: '1px solid white', width: '50%' }} />
              </div> */}
            </form>
            <Button
              fullWidth
              size="large"
              sx={{ mt: 3, mb: 2, color: 'white', borderRadius: 10 }}
              // type="submit"
              variant="outlined"
            >
              <div style={{}}>
                <img src='/fb.png'
                  style={{ marginRight: '8px' }} />
                Sign in with Facebook
              </div>

            </Button>
            <Button
              fullWidth
              size="large"
              sx={{ mb: 2, color: 'white', borderRadius: 10 }}
              // type="submit"
              variant="outlined"
            >
              <img src='/tw.png'
                style={{ marginRight: '8px' }} />
              Sign in with Twitter
            </Button>

            <Dialog open={pass}
              onClose={handleClosePassword}
              aria-labelledby="form-dialog-title"
            >

              <DialogContent sx={{ backgroundColor: "black", border: "3px solid #6366F1", borderRadius: 20, padding:0 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', pl: '24px', pr: '24px', pt: '10px' }}>
                  <DialogTitle id="form-dialog-title"
                    style={{ color: 'white', padding: 0, fontSize: 40, fontWeight: '400', marginRight: 10 }}>Password reset</DialogTitle>
                  <DialogTitle id="form-dialog-title"
                    style={{ color: '#607BCC', padding: 0, fontSize: 14 }}
                    sx={{ textTransform: 'uppercase' }}>Back</DialogTitle>
                </Box>
                <DialogContentText sx={{ color: "#AAA7B2", mb: '23px', mt: '23px', pl: '24px' }}>
                  We will help you reset it and get back on track.
                </DialogContentText>
                <ResetPassword />
              </DialogContent>

            </Dialog>

          </div>

        </Box>


      </Box>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ border: '1px solid white', width: '50%' }} />
        <span style={{ color: 'white', marginLeft: 5, marginRight: 5 }}>or</span>
        <div style={{ border: '1px solid white', width: '50%' }} />
      </div>
    </>
  );
};

export default Login;
