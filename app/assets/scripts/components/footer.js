import React from 'react'

export default function () {
  return (
    <div className='footer' id='footer'>
      <div className='footer-notes'>
          <h1 className='heading-alt'>Notes</h1>
          <dl>
            <dt>Families Below Poverty</dt>
            <dd>Defined as the percentage of families (i.e. parent(s)with children below 18 years of age) that fall below the poverty line in a given zip code
            </dd>
            <dt>Number of Out-of-School Time Programs</dt>
            <dd>Defined as the number of programs that are held at least 3 days a week, 12 hours a week over the course of a school year in a particular zip code; alternatively, for the summer, this narrows to at least 4 days a week, 16 hours a week for 8 weeks. This number only encompasses the program data that we received from funders and met our criteria; it does not cover the full extent of programs in the region.
            </dd>
            <dt>Median Income</dt>
            <dd>Defined as the midpoint of the incomes measured among 18+ year old individuals and families in a particular zip code
            </dd>
            <dt>Total School-Aged Children</dt>
            <dd>Defined as the number of children in a zip code that are eligible to attend a secondary school</dd>
            <dt>Dropout Factories</dt>
            <dd>Defined as high schools with a senior class comprised of 60 percent or fewer of the students that entered as freshmen</dd>
            <dt>Feeder Schools</dt>
            <dd>Defined as schools that contribute a majority of its students to a dropout factory high school</dd>
            <dt>Total Funding for Programs</dt>
            <dd>Defined as the total sum of funding that the programs within a particular zip code receive for dedicated out-of-school time programs; to qualify, funds had to support programs that met the above definition (see “number of out-of-time school programs”)</dd>
            <dt>Public Transportation Routes Available within 0.5 mile Radius</dt>
            <dd> Defined as the number of points from which an individual could access public transportation (i.e. rail, bus, etc.) within half a mile of his or her residence. </dd>
          </dl>
          <p>The index depicts the extent of the gap between the number of available slots and the number of students served in out-of-school time programs in Harris County. In addition to this base layer of slots versus students, we have also included additional, socioeconomic and educational data to further contextualize a particular neighborhood’s need for out-of-school time programs. </p>
          <a href='http://houstonendowment.org'>Contact Us</a>
        </div>
        <div className='footer-sources'>
          <h1 className='heading-alt'>Sources</h1>
          <p>1. Data for “number of school-age children” and “percentage of families below poverty level” generated from US Census Bureau, 2010-2014 American Community Survey 5-Year Estimates</p>
          <p>2. Data for “distance to public transportation” generated from Center for Neighborhood Technology, All-Transit database, 2016.</p>
          <p>3. Data for “feeder schools” and “dropout factories” generated from United Way of Greater Houston School Data Project, Education Research Center at Texas A&M University, 2015.</p>
          <p>4. Data for “students,” “slots,” “programs” and “funds” generated from funder responses to internal questionnaire.</p>
      </div>
    </div>
  )
}
