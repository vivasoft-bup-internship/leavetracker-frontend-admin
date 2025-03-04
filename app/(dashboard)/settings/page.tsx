'use client';
// import node module libraries
import { Col, Row, Container, Tab, Card, Nav, Badge } from 'react-bootstrap';
import { getSession, useSession } from 'next-auth/react';
const NEXTAUTH_SECRET = 'WILa8wOhnXPI9T5N1NyF4I5FfRq7RU2vNBkriUaMvXE='

// import widget as custom components
import { HighlightCode, PageHeading } from '../../../widgets';

import SettingsHeader from '../../../sub-components/settings/SettingsHeader';
// import sub components
import {
  AboutMe,
  ActivityFeed,
  MyTeam,
  ProjectsContributions,
  RecentFromBlog,
} from '../../../sub-components'
import { useEffect, useState } from 'react';
import { getLeaveTypes } from '../../../data/leave-request/data';
import { getRoles } from '../../../data/employee/data';

const Settings = () => {
  const { data: session, status } = useSession()
  const [leavetypes, setLeaveTypes] = useState([])
  const [roles, setRoles] = useState([])
  useEffect(() => {
    if (status === 'authenticated') {
      getLeaveTypes().then((leavetypes) => {
        setLeaveTypes(leavetypes);
      });
      getRoles().then((roles) => {
        setRoles(roles);
      });
    }
  }, [status]);
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      <PageHeading heading="Settings" />

      {/* Settings Header  */}
      <SettingsHeader leavetypes={leavetypes} roles={roles} />
    </Container >
  )
}

export default Settings