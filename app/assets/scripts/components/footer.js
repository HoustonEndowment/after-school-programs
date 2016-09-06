import React from 'react'

export default function () {
  return (
    <div className='footer'>
      <div className='footer-sources'>
        <h1 className='heading-alt'>Sources</h1>
          <p>1. Data for “number of school-age children” and “percentage of families below poverty level” generated from US Census Bureau, 2010-2014 American Community Survey 5-Year Estimates</p>

          <p>2. Data for “distance to public transportation” generated from Center for Neighborhood Technology, All-Transit database, 2016.</p>

          <p>3. Data for “feeder schools” and “dropout factories” generated from United Way of Greater Houston School Data Project, Education Research Center at Texas A&M University, 2015.</p>

          <p>4. Data for “students,” “slots,” “programs” and “funds” generated from funder responses to internal questionnaire.</p>
        <h1 className='heading-alt'>Notes</h1>
        <p>The index depicts the extent of the gap between the number of available slots and the number of students served in out-of-school time programs in Harris County. In addition to this base layer of slots versus students, we have also included additional, socioeconomic and educational data to further contextualize a particular neighborhood’s need for out-of-school time programs.</p>
      </div>
      <div className='footer-links'>
        <h1 className='heading-alt'>More Information</h1>
        <a href='#methodology'>View Our Methodology</a>
        <a href='#contact'>Contact Us</a>
      </div>
    </div>
  )
}
