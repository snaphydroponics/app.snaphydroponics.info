import React from 'react'
import Form from 'react-bootstrap/Form';
import FeedbackButton from './FeedbackButton';
import axios from 'axios';
import {Formik} from 'formik';

class Feedback extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      loading: false,
      success: null
    };
  }

  handleChange = e => this.setState({[e.target.name]: e.target.value}); 

  handleSubmit(values) {

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    this.setState({
      loading: true
    });

    axios.post('/', values, config).then((result) => {
      console.log(result);
      this.setState({
        success: true
      });
    }).catch((err) => {
      console.log(err);
      this.setState({
        success: false
      });
    }).finally(() => {
      this.setState({
        loading: false
      });
    });
  }

  render() {
    const lang = this.props.match.url.match(/^\/en/) ? 'en' : 'fil';
    const { loading } = this.state;
    return(
      <div className="container">
        <header className="my-5">
          <h1 id="content">{
            lang === 'en' ?
              <span>Send Feedback</span> :
              <span>Pagpadala ng <i lang="en">Feedback</i></span>
          }</h1>
        <p className="lead">{
          lang === 'en' ? 
            <span>Please help us improve this app. Send a feedback below.</span> :
            <span>Mangyaring tulungan kaming mapabuti pa ang <i lang="en">app</i> na ito. Magpadala ng <i lang="en">feedback</i> sa baba.</span>
        }</p>

        </header>
        <Formik
          initialValues={{ type: '', details: ''}}
          validate={(values) => {
            let errors = {};
            if (!values.type) {
              errors.type = true;
            }

            if (!values.details) {
              errors.details = true;
            }
            return errors;
          }}
          onSubmit={this.handleSubmit}>
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors
            }) => (
          <Form noValidate disabled={loading} className="my-3" onSubmit={handleSubmit}>
            <Form.Group controlId="feedback-type">
              <Form.Label size="lg" as="legend" column>{
                lang === 'en' ?  "I’m telling you about" : "Ang aking ipinaaalam ay tungkol sa."}
              </Form.Label>
              <Form.Control required onChange={handleChange} value={values.type} name="type" size="lg" as="select" isInvalid={touched.type && errors.type}>
                <option value="">{ lang === 'en' ? 'Choose…' : 'Pumili…' }</option>
                <option value="bug-typo">{ lang === 'en' ? 'A bug or typographical error.' : 'Bug o typographical na pagkakamali'}</option>
                <option value="enhancement">{ lang === 'en' ? 'An enhancement or feature request' : 'Pagpapahusay o paghiling ng feature'}</option>
                <option value="kudos">{ lang === 'en' ? 'Kudos' : 'Pagpuri' }</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">{ lang === 'en' ? 'Please choose.' : 'Mangyaring pumili.' }</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="feedback-details">
              <Form.Label size="lg" as="legend" column>{ lang === 'en' ? 'Details' : 'Mga detalye' }</Form.Label>
              <Form.Control required onChange={handleChange} value={values.details} name="details" size="lg" as="textarea" rows="5" placeholder={ lang === 'en' ? "Details…" : "Mga detalye…" } isInvalid={touched.type && errors.details} ></Form.Control>
              <Form.Control.Feedback type="invalid">{ lang === 'en' ? 'Please fill this out.' : 'Mangyaring punan ito.' }</Form.Control.Feedback>
            </Form.Group>
            <FeedbackButton loading={loading} lang={lang} />
            <input type="hidden" name="form-name" value="feedback" />
          </Form>
          )
        }</Formik>
      </div>
    );
  }
}


export default Feedback;
