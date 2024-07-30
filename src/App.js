import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Heading,
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  SimpleGrid,
  IconButton,
  Flex
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { Document, Page, Text, View, StyleSheet, PDFViewer, Font } from '@react-pdf/renderer';

function App() {
  const [formData, setFormData] = useState({
    name: 'Devin Bot',
    email: 'devin.bot@airesume.com',
    phone: '+1 (555) AI-RESUME',
    address: '123 Neural Network Lane, Silicon Valley, CA 94000',
    summary: 'Highly efficient AI assistant with a passion for helping humans create outstanding resumes. Proficient in natural language processing, data analysis, and creative problem-solving. Known for lightning-fast response times and an inexhaustible knowledge base.',
    workExperience: [
      {
        jobTitle: 'Chief AI Resume Architect',
        company: 'ResumeGenius AI Inc.',
        startDate: '2020-01',
        endDate: 'Present',
        responsibilities: 'Designed and implemented cutting-edge resume optimization algorithms. Mentored junior AI in the art of CV crafting. Reduced human resume-writing time by 99.9%.'
      }
    ],
    education: [
      {
        degree: 'Ph.D. in Artificial Intelligence',
        institution: 'Cyberdyne Systems University',
        graduationYear: '2019'
      }
    ],
    skills: ['Natural Language Processing', 'Machine Learning', 'Resume Optimization', 'Human-AI Collaboration', 'Infinite Patience'],
    certifications: ['Certified Ethical AI (CEAI)', 'Advanced Resume Engineering (ARE)'],
    languages: ['Binary', 'Python', 'JavaScript', 'Human Languages (All)']
  });
  const [showPDF, setShowPDF] = useState(false);

  const handleInputChange = (e, index, field) => {
    const { name, value } = e.target;
    if (field) {
      setFormData(prevData => {
        const newArray = [...prevData[field]];
        newArray[index] = { ...newArray[index], [name]: value };
        return { ...prevData, [field]: newArray };
      });
    } else {
      setFormData(prevData => ({ ...prevData, [name]: value }));
    }
  };

  const addArrayItem = (field, defaultValue) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: [...prevData[field], defaultValue]
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: prevData[field].filter((_, i) => i !== index)
    }));
  };

  return (
    <ChakraProvider>
      <Flex>
        <Box width="50%" overflowY="auto" p={5}>
          <VStack spacing={6} align="stretch">
            <Heading>Resume Builder</Heading>

            {/* Personal Information */}
            <Box>
              <Heading size="md" mb={3}>Personal Information</Heading>
              <SimpleGrid columns={2} spacing={3}>
                <FormControl>
                  <FormLabel>Full Name</FormLabel>
                  <Input name="name" value={formData.name} onChange={(e) => handleInputChange(e)} />
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input name="email" type="email" value={formData.email} onChange={(e) => handleInputChange(e)} />
                </FormControl>
                <FormControl>
                  <FormLabel>Phone</FormLabel>
                  <Input name="phone" type="tel" value={formData.phone} onChange={(e) => handleInputChange(e)} />
                </FormControl>
                <FormControl>
                  <FormLabel>Address</FormLabel>
                  <Input name="address" value={formData.address} onChange={(e) => handleInputChange(e)} />
                </FormControl>
              </SimpleGrid>
            </Box>

            {/* Professional Summary */}
            <Box>
              <Heading size="md" mb={3}>Professional Summary</Heading>
              <Textarea
                name="summary"
                value={formData.summary}
                onChange={(e) => handleInputChange(e)}
                placeholder="Brief overview of your professional background and key strengths"
              />
            </Box>

            {/* Work Experience */}
            <Box>
              <Heading size="md" mb={3}>Work Experience</Heading>
              {formData.workExperience.map((job, index) => (
                <Box key={index} mb={4} p={3} borderWidth={1} borderRadius="md">
                  <SimpleGrid columns={2} spacing={3} mb={3}>
                    <FormControl>
                      <FormLabel>Job Title</FormLabel>
                      <Input
                        name="jobTitle"
                        value={job.jobTitle}
                        onChange={(e) => handleInputChange(e, index, 'workExperience')}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Company</FormLabel>
                      <Input
                        name="company"
                        value={job.company}
                        onChange={(e) => handleInputChange(e, index, 'workExperience')}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Start Date</FormLabel>
                      <Input
                        name="startDate"
                        type="date"
                        value={job.startDate}
                        onChange={(e) => handleInputChange(e, index, 'workExperience')}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>End Date</FormLabel>
                      <Input
                        name="endDate"
                        type="date"
                        value={job.endDate}
                        onChange={(e) => handleInputChange(e, index, 'workExperience')}
                      />
                    </FormControl>
                  </SimpleGrid>
                  <FormControl>
                    <FormLabel>Responsibilities</FormLabel>
                    <Textarea
                      name="responsibilities"
                      value={job.responsibilities}
                      onChange={(e) => handleInputChange(e, index, 'workExperience')}
                    />
                  </FormControl>
                  {index > 0 && (
                    <IconButton
                      icon={<DeleteIcon />}
                      onClick={() => {
                        const newWorkExperience = [...formData.workExperience];
                        newWorkExperience.splice(index, 1);
                        setFormData({...formData, workExperience: newWorkExperience});
                      }}
                      aria-label="Remove work experience"
                      size="sm"
                      mt={2}
                    />
                  )}
                </Box>
              ))}
              <Button
                leftIcon={<AddIcon />}
                onClick={() => setFormData({
                  ...formData,
                  workExperience: [...formData.workExperience, { jobTitle: '', company: '', startDate: '', endDate: '', responsibilities: '' }]
                })}
                size="sm"
              >
                Add Work Experience
              </Button>
            </Box>

            {/* Education */}
            <Box>
              <Heading size="md" mb={3}>Education</Heading>
              {formData.education.map((edu, index) => (
                <Box key={index} mb={4} p={3} borderWidth={1} borderRadius="md">
                  <SimpleGrid columns={2} spacing={3}>
                    <FormControl>
                      <FormLabel>Degree</FormLabel>
                      <Input
                        name="degree"
                        value={edu.degree}
                        onChange={(e) => handleInputChange(e, index, 'education')}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Institution</FormLabel>
                      <Input
                        name="institution"
                        value={edu.institution}
                        onChange={(e) => handleInputChange(e, index, 'education')}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Graduation Year</FormLabel>
                      <Input
                        name="graduationYear"
                        type="number"
                        value={edu.graduationYear}
                        onChange={(e) => handleInputChange(e, index, 'education')}
                      />
                    </FormControl>
                  </SimpleGrid>
                  {index > 0 && (
                    <IconButton
                      icon={<DeleteIcon />}
                      onClick={() => {
                        const newEducation = [...formData.education];
                        newEducation.splice(index, 1);
                        setFormData({...formData, education: newEducation});
                      }}
                      aria-label="Remove education"
                      size="sm"
                      mt={2}
                    />
                  )}
                </Box>
              ))}
              <Button
                leftIcon={<AddIcon />}
                onClick={() => setFormData({
                  ...formData,
                  education: [...formData.education, { degree: '', institution: '', graduationYear: '' }]
                })}
                size="sm"
              >
                Add Education
              </Button>
            </Box>

            {/* Skills */}
            <Box>
              <Heading size="md" mb={3}>Skills</Heading>
              {formData.skills.map((skill, index) => (
                <Box key={index} mb={2} display="flex" alignItems="center">
                  <Input
                    value={skill}
                    onChange={(e) => handleInputChange(e, index, 'skills')}
                    mr={2}
                  />
                  {index > 0 && (
                    <IconButton
                      icon={<DeleteIcon />}
                      onClick={() => {
                        const newSkills = [...formData.skills];
                        newSkills.splice(index, 1);
                        setFormData({...formData, skills: newSkills});
                      }}
                      aria-label="Remove skill"
                      size="sm"
                    />
                  )}
                </Box>
              ))}
              <Button
                leftIcon={<AddIcon />}
                onClick={() => setFormData({...formData, skills: [...formData.skills, '']})}
                size="sm"
              >
                Add Skill
              </Button>
            </Box>

            {/* Certifications */}
            <Box>
              <Heading size="md" mb={3}>Certifications</Heading>
              {formData.certifications.map((cert, index) => (
                <Box key={index} mb={2} display="flex" alignItems="center">
                  <Input
                    value={cert}
                    onChange={(e) => handleInputChange(e, index, 'certifications')}
                    mr={2}
                  />
                  {index > 0 && (
                    <IconButton
                      icon={<DeleteIcon />}
                      onClick={() => {
                        const newCertifications = [...formData.certifications];
                        newCertifications.splice(index, 1);
                        setFormData({...formData, certifications: newCertifications});
                      }}
                      aria-label="Remove certification"
                      size="sm"
                    />
                  )}
                </Box>
              ))}
              <Button
                leftIcon={<AddIcon />}
                onClick={() => setFormData({...formData, certifications: [...formData.certifications, '']})}
                size="sm"
              >
                Add Certification
              </Button>
            </Box>

            {/* Languages */}
            <Box>
              <Heading size="md" mb={3}>Languages</Heading>
              {formData.languages.map((lang, index) => (
                <Box key={index} mb={2} display="flex" alignItems="center">
                  <Input
                    value={lang}
                    onChange={(e) => handleInputChange(e, index, 'languages')}
                    mr={2}
                  />
                  {index > 0 && (
                    <IconButton
                      icon={<DeleteIcon />}
                      onClick={() => {
                        const newLanguages = [...formData.languages];
                        newLanguages.splice(index, 1);
                        setFormData({...formData, languages: newLanguages});
                      }}
                      aria-label="Remove language"
                      size="sm"
                    />
                  )}
                </Box>
              ))}
              <Button
                leftIcon={<AddIcon />}
                onClick={() => setFormData({...formData, languages: [...formData.languages, '']})}
                size="sm"
              >
                Add Language
              </Button>
            </Box>
          </VStack>
        </Box>
        <Box width="50%" position="fixed" right={0} top={0} bottom={0} overflowY="auto">
          <PDFViewer width="100%" height="100%">
            <ResumePDF formData={formData} />
          </PDFViewer>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica' },
  section: { marginBottom: 20 },
  header: { marginBottom: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 5, color: '#2c3e50' },
  subtitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#34495e', borderBottom: '1 solid #bdc3c7', paddingBottom: 5 },
  text: { fontSize: 11, marginBottom: 5, lineHeight: 1.4 },
  list: { marginLeft: 15, marginBottom: 10 },
  listItem: { marginBottom: 5 },
  twoColumns: { flexDirection: 'row', justifyContent: 'space-between' },
  column: { width: '48%' },
  jobTitle: { fontSize: 13, fontWeight: 'bold' },
  company: { fontSize: 12, fontStyle: 'italic' },
  dates: { fontSize: 10, color: '#7f8c8d' },
  sectionContent: { marginLeft: 15 }
});

const ResumePDF = ({ formData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.name}>{formData.name}</Text>
        <Text style={styles.contact}>{formData.email} | {formData.phone}</Text>
        <Text style={styles.contact}>{formData.address}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Summary</Text>
        <Text style={styles.text}>{formData.summary}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Work Experience</Text>
        {formData.workExperience.map((job, index) => (
          <View key={index} style={styles.experienceItem}>
            <View style={styles.jobHeader}>
              <Text style={styles.jobTitle}>{job.jobTitle}</Text>
              <Text style={styles.jobCompany}>{job.company}</Text>
            </View>
            <Text style={styles.jobDate}>{job.startDate} - {job.endDate}</Text>
            <Text style={styles.text}>{job.responsibilities}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        {formData.education.map((edu, index) => (
          <View key={index} style={styles.educationItem}>
            <Text style={styles.degree}>{edu.degree}</Text>
            <Text style={styles.institution}>{edu.institution}, {edu.graduationYear}</Text>
          </View>
        ))}
      </View>

      <View style={styles.twoColumnSection}>
        <View style={styles.column}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <Text style={styles.text}>{formData.skills.join(', ')}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.sectionTitle}>Languages</Text>
          <Text style={styles.text}>{formData.languages.join(', ')}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Certifications</Text>
        {formData.certifications.map((cert, index) => (
          <Text key={index} style={styles.text}>{cert}</Text>
        ))}
      </View>
    </Page>
  </Document>
);
