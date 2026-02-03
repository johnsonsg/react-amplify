import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { generateClient } from "aws-amplify/api";
import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { listNotes } from "./graphql/queries";
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
} from "./graphql/mutations";

const client = generateClient();

export const App = ({ signOut, disableAutoFetch = false }) => {
  const [notes, setNotes] = useState([]);

  const initialValues = {
    name: "",
    description: "",
    priority: "",
  };

  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const validators = {
    name: [(value) => (!value?.trim() ? "Name is required" : null)],
    description: [],
    priority: [],
  };

  const resetStateValues = () => {
    setValues(initialValues);
    setTouched({});
    setErrors({});
    setSubmitAttempted(false);
  };

  const validateOne = (fieldName, value) => {
    const fieldValidators = validators[fieldName] ?? [];
    for (const validator of fieldValidators) {
      const message = validator(value);
      if (message) return message;
    }
    return null;
  };

  const validateAll = (nextValues) => {
    const nextErrors = {};
    Object.keys(validators).forEach((fieldName) => {
      const message = validateOne(fieldName, nextValues[fieldName]);
      if (message) nextErrors[fieldName] = message;
    });
    return nextErrors;
  };

  const shouldShowError = (fieldName) => {
    return Boolean(submitAttempted || touched[fieldName]);
  };

  const setFieldValue = (fieldName, value) => {
    setValues((prev) => {
      const nextValues = { ...prev, [fieldName]: value };
      if (errors[fieldName]) {
        const message = validateOne(fieldName, value);
        setErrors((prevErrors) => {
          if (!message) {
            const { [fieldName]: _ignored, ...rest } = prevErrors;
            return rest;
          }
          return { ...prevErrors, [fieldName]: message };
        });
      }
      return nextValues;
    });
  };

  const handleBlur = (fieldName) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    const message = validateOne(fieldName, values[fieldName]);
    setErrors((prev) => {
      if (!message) {
        const { [fieldName]: _ignored, ...rest } = prev;
        return rest;
      }
      return { ...prev, [fieldName]: message };
    });
  };

  useEffect(() => {
    if (!disableAutoFetch) {
      fetchNotes();
    }
  }, [disableAutoFetch]);

  async function fetchNotes() {
    const apiData = await client.graphql({ query: listNotes });
    const notesFromAPI = apiData.data.listNotes.items;
    setNotes(notesFromAPI);
  }

  async function createNote(event) {
    event.preventDefault();

    setSubmitAttempted(true);

    const nextErrors = validateAll(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    try {
      const input = { ...values };
      Object.entries(input).forEach(([key, value]) => {
        if (typeof value === "string" && value.trim() === "") {
          input[key] = null;
        }
      });

      await client.graphql({
        query: createNoteMutation,
        variables: { input },
      });

      resetStateValues();
      fetchNotes();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  async function deleteNote({ id }) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    await client.graphql({
      query: deleteNoteMutation,
      variables: { input: { id } },
    });
  }

  return (
    <View className="App">
      <Heading level={1}>My Notes App</Heading>
      <View as="form" margin="3rem 0" onSubmit={createNote}>
        <Flex direction="row" justifyContent="center" alignItems="flex-start">
          <TextField
            name="name"
            placeholder="Note Name"
            label="Note Name"
            labelHidden
            variation="quiet"
            value={values.name}
            isRequired={true}
            onChange={(e) => {
              setFieldValue("name", e.target.value);
            }}
            onBlur={() => handleBlur("name")}
            errorMessage={shouldShowError("name") ? errors.name : undefined}
            hasError={shouldShowError("name") && Boolean(errors.name)}
          />
          <TextField
            name="description"
            placeholder="Note Description"
            label="Note Description"
            labelHidden
            variation="quiet"
            value={values.description}
            isRequired={false}
            onChange={(e) => {
              setFieldValue("description", e.target.value);
            }}
            onBlur={() => handleBlur("description")}
            errorMessage={
              shouldShowError("description") ? errors.description : undefined
            }
            hasError={
              shouldShowError("description") && Boolean(errors.description)
            }
          />
          <TextField
            name="priority"
            placeholder="Note Priority"
            label="Note Priority"
            labelHidden
            variation="quiet"
            value={values.priority}
            isRequired={false}
            onChange={(e) => {
              setFieldValue("priority", e.target.value);
            }}
            onBlur={() => handleBlur("priority")}
            errorMessage={shouldShowError("priority") ? errors.priority : undefined}
            hasError={shouldShowError("priority") && Boolean(errors.priority)}
          />
          <Button
            type="submit"
            variation="primary"
            isDisabled={Object.keys(errors).length > 0}
            alignSelf="flex-start"
          >
            Create Note
          </Button>
          <Button
            type="button"
            variation="link"
            onClick={resetStateValues}
            alignSelf="flex-start"
          >
            Clear
          </Button>
        </Flex>
      </View>
      <Heading level={2}>Current Notes</Heading>
      <View margin="3rem 0">
        {notes.map((note) => (
          <Flex
            key={note.id || note.name}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Text as="strong" fontWeight={700}>
              {note.name}
            </Text>
            <Text as="span">{note.description}</Text>
            <Text as="span">
              {note.priority ? `Priority: ${note.priority}` : ""}
            </Text>
            <Button variation="link" onClick={() => deleteNote(note)}>
              Delete note
            </Button>
          </Flex>
        ))}
      </View>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default withAuthenticator(App);