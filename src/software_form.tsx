// src/MyConditionalForm.jsx
import React, { useState } from 'react';
// CHANGE THIS LINE: Import Form from the Chakra UI theme package
// import Form from '@rjsf/core';
import Form from '@rjsf/chakra-ui';
import validator from '@rjsf/validator-ajv8';

const formDescription = `Estimado(a) colega,<br><br>
Como parte de la consultoría para optimizar el uso y la gestión del software en la Gerencia de Geología, necesitamos recopilar información sobre las herramientas que utilizas habitualmente. Tu participación es fundamental para obtener una visión clara de cómo se utiliza el software en la práctica y para identificar oportunidades de mejora que beneficien a nuestro equipo.<br><br>
Esta encuesta tomará solo unos pocos minutos. La información recopilada será utilizada únicamente para los fines de este proyecto y tratada de forma confidencial.<br><br>
¡Muchas gracias por tu tiempo y colaboración!<br><br>
Atentamente,<br><br>
Geovalidata: Equipo de Consultoría / Gerencia de Geología Quellaveco`;


// Your provided JSON Schema
const schema = {
  title: "Encuesta de Uso de Software en Gerencia de Geología",
  description: formDescription,
  type: "object",
  required: ["nombreParticipante", "softwaresUtilizados", "Superintendencia", "Cargo", "Turno", "Ubicacion"],
  properties: {
    nombreParticipante: {
      type: "string",
      title: "Nombre:",
      minLength: 2,
    },
    Superintendencia: {
    type: "string",
    title: "¿A qué superintendencia perteneces?",
    enum: ["Superintendencia Recursos Minerales","Superintendencia Geología de Minas","Superintendencia Geología y NearMine"]
    },
    Cargo: {
      type: "string",
      title: "Cargo:",
      minLength: 2,
    },
    Turno: {
      type: "string",
      title: "Turno:",
      minLength: 2,
    },
    Ubicacion: {
    type: "string",
    title: "Ubicación: ¿En donde desempeñas tus labores?",
    enum: ["Mina","Oficina Central","Remoto"]
    },
    softwaresUtilizados: {
      type: "array",
      title: "¿Qué softwares utilizas de manera habitual en tu trabajo? (Selecciona todas las que apliquen)",
      items: {
        type: "string",
        enum: ["MinePlan", "LeapFrog", "Central", "Studio RM", "Supervisor","Isatis"]
      },
      uniqueItems: true,
      minItems: 1,
    },
  },
  allOf: [
    {
      if: {
        properties: {
          softwaresUtilizados: {
            contains: { type: "string", const: "MinePlan" },
          },
        },
      },
      then: {
        properties: {
          moduloMinePlan: {
            type: "object",
            title: "MinePlan",
            required: ["frecuenciaUsoMinePlan"],
            properties: {
              frecuenciaUsoMinePlan: {
                type: "string",
                title: "Para MinePlan, por favor indica ¿con qué frecuencia lo utilizas?",
                enum: ["Diario","Semanal","Mensual","Ocasionalmente","Rara vez/ Nunca"]
              },
              nivelEntrenamientoMinePlan: {
                type: "string",
                title: "¿Cuál es tu nivel de entrenamiento en MinePlan?",
                enum: [
                  "Básico / Autoaprendizaje: Conozco los fundamentos del software, puedo realizar tareas simples o he aprendido principalmente por mi cuenta con tutoriales básicos.",
                  "Intermedio / Usuario Regular: Lo utilizo habitualmente para mis tareas principales, he recibido alguna capacitación básica o tengo experiencia práctica considerable.",
                  "Avanzado / Experto Funcional: Domino la mayoría de las funcionalidades clave y complejas, puedo resolver problemas avanzados y trabajar de forma eficiente.",
                  "Experto / Capacitador o Desarrollador Interno: No solo lo domino, sino que tengo la capacidad de capacitar a otros en su uso, o de desarrollar soluciones y automatizaciones específicas dentro del software."
                ]
              },
              fileUploadMinePlan: {
                type: "string",
                title: "¿Tienes alguna certificación oficial de MinePlan? Adjunta el badge o diploma de tu certificación oficial de MinePlan (si aplica)",
                format: "data-url",
                "ui:widget": "file"
              },
              modulosMinePlan: {
                type: "string",
                title: "¿Qué módulos de MinePlan utilizas en las funciones correspondientes a tu cargo? (Si no conoce los nombres de los módulos, describa las actividades que realiza en el software)",
              },
              modalidadMinePlan: {
                type: "string",
                title: "¿En qué tipo de equipo o modalidad utilizas MinePlan PRO?",
                enum: ["PC", "Maquina Virtual", "Web / SaaS"]
              },
            }
          }
        },
      },
    },
    // LeapFrog
    {
      if: {
        properties: {
          softwaresUtilizados: {
            contains: { type: "string", const: "LeapFrog" },
          },
        },
      },
      then: {
        properties: {
          moduloLeapFrog: {
            type: "object",
            title: "LeapFrog",
            required: ["frecuenciaUsoLeapFrog"],
            properties: {
              frecuenciaUsoLeapFrog: {
                type: "string",
                title: "Para LeapFrog, por favor indica ¿con qué frecuencia lo utilizas?",
                enum: ["Diario", "Semanal", "Mensual", "Ocasionalmente", "Rara vez/ Nunca"]
              },
              nivelEntrenamientoLeapFrog: {
                type: "string",
                title: "¿Cuál es tu nivel de entrenamiento en LeapFrog?",
                enum: [
                  "Básico / Autoaprendizaje: Conozco los fundamentos del software, puedo realizar tareas simples o he aprendido principalmente por mi cuenta con tutoriales básicos.",
                  "Intermedio / Usuario Regular: Lo utilizo habitualmente para mis tareas principales, he recibido alguna capacitación básica o tengo experiencia práctica considerable.",
                  "Avanzado / Experto Funcional: Domino la mayoría de las funcionalidades clave y complejas, puedo resolver problemas avanzados y trabajar de forma eficiente.",
                  "Experto / Capacitador o Desarrollador Interno: No solo lo domino, sino que tengo la capacidad de capacitar a otros en su uso, o de desarrollar soluciones y automatizaciones específicas dentro del software."
                ]
              },
              fileUploadLeapFrog: {
                type: "string",
                title: "¿Tienes alguna certificación oficial de LeapFrog? Adjunta el badge o diploma de tu certificación oficial de LeapFrog (si aplica)",
                format: "data-url",
                "ui:widget": "file"
              },
              modulosLeapFrog: {
                type: "string",
                title: "¿Qué módulos de LeapFrog utilizas en las funciones correspondientes a tu cargo? (Si no conoce los nombres de los módulos, describa las actividades que realiza en el software)",
              },
              modalidadLeapFrog: {
                type: "string",
                title: "¿En qué tipo de equipo o modalidad utilizas LeapFrog?",
                enum: ["PC", "Maquina Virtual", "Web / SaaS"]
              },
            }
          }
        },
      },
    },
    // Central
    {
      if: {
        properties: {
          softwaresUtilizados: {
            contains: { type: "string", const: "Central" },
          },
        },
      },
      then: {
        properties: {
          moduloCentral: {
            type: "object",
            title: "Central",
            required: ["frecuenciaUsoCentral"],
            properties: {
              frecuenciaUsoCentral: {
                type: "string",
                title: "Para Central, por favor indica ¿con qué frecuencia lo utilizas?",
                enum: ["Diario", "Semanal", "Mensual", "Ocasionalmente", "Rara vez/ Nunca"]
              },
              nivelEntrenamientoCentral: {
                type: "string",
                title: "¿Cuál es tu nivel de entrenamiento en Central?",
                enum: [
                  "Básico / Autoaprendizaje: Conozco los fundamentos del software, puedo realizar tareas simples o he aprendido principalmente por mi cuenta con tutoriales básicos.",
                  "Intermedio / Usuario Regular: Lo utilizo habitualmente para mis tareas principales, he recibido alguna capacitación básica o tengo experiencia práctica considerable.",
                  "Avanzado / Experto Funcional: Domino la mayoría de las funcionalidades clave y complejas, puedo resolver problemas avanzados y trabajar de forma eficiente.",
                  "Experto / Capacitador o Desarrollador Interno: No solo lo domino, sino que tengo la capacidad de capacitar a otros en su uso, o de desarrollar soluciones y automatizaciones específicas dentro del software."
                ]
              },
              fileUploadCentral: {
                type: "string",
                title: "¿Tienes alguna certificación oficial de Central? Adjunta el badge o diploma de tu certificación oficial de Central (si aplica)",
                format: "data-url",
                "ui:widget": "file"
              },
              modulosCentral: {
                type: "string",
                title: "¿Qué módulos de Central utilizas en las funciones correspondientes a tu cargo? (Si no conoce los nombres de los módulos, describa las actividades que realiza en el software)",
              },
              modalidadCentral: {
                type: "string",
                title: "¿En qué tipo de equipo o modalidad utilizas Central?",
                enum: ["PC", "Maquina Virtual", "Web / SaaS"]
              },
            }
          }
        },
      },
    },
    // Studio RM
    {
      if: {
        properties: {
          softwaresUtilizados: {
            contains: { type: "string", const: "Studio RM" },
          },
        },
      },
      then: {
        properties: {
          moduloStudioRM: {
            type: "object",
            title: "Studio RM",
            required: ["frecuenciaUsoStudioRM"],
            properties: {
              frecuenciaUsoStudioRM: {
                type: "string",
                title: "Para Studio RM, por favor indica ¿con qué frecuencia lo utilizas?",
                enum: ["Diario", "Semanal", "Mensual", "Ocasionalmente", "Rara vez/ Nunca"]
              },
              nivelEntrenamientoStudioRM: {
                type: "string",
                title: "¿Cuál es tu nivel de entrenamiento en Studio RM?",
                enum: [
                  "Básico / Autoaprendizaje: Conozco los fundamentos del software, puedo realizar tareas simples o he aprendido principalmente por mi cuenta con tutoriales básicos.",
                  "Intermedio / Usuario Regular: Lo utilizo habitualmente para mis tareas principales, he recibido alguna capacitación básica o tengo experiencia práctica considerable.",
                  "Avanzado / Experto Funcional: Domino la mayoría de las funcionalidades clave y complejas, puedo resolver problemas avanzados y trabajar de forma eficiente.",
                  "Experto / Capacitador o Desarrollador Interno: No solo lo domino, sino que tengo la capacidad de capacitar a otros en su uso, o de desarrollar soluciones y automatizaciones específicas dentro del software."
                ]
              },
              fileUploadStudioRM: {
                type: "string",
                title: "¿Tienes alguna certificación oficial de Studio RM? Adjunta el badge o diploma de tu certificación oficial de Studio RM (si aplica)",
                format: "data-url",
                "ui:widget": "file"
              },
              modulosStudioRM: {
                type: "string",
                title: "¿Qué módulos de Studio RM utilizas en las funciones correspondientes a tu cargo? (Si no conoce los nombres de los módulos, describa las actividades que realiza en el software)",
              },
              modalidadStudioRM: {
                type: "string",
                title: "¿En qué tipo de equipo o modalidad utilizas Studio RM?",
                enum: ["PC", "Maquina Virtual", "Web / SaaS"]
              },
            }
          }
        },
      },
    },
    // Supervisor
    {
      if: {
        properties: {
          softwaresUtilizados: {
            contains: { type: "string", const: "Supervisor" },
          },
        },
      },
      then: {
        properties: {
          moduloSupervisor: {
            type: "object",
            title: "Supervisor",
            required: ["frecuenciaUsoSupervisor"],
            properties: {
              frecuenciaUsoSupervisor: {
                type: "string",
                title: "Para Supervisor, por favor indica ¿con qué frecuencia lo utilizas?",
                enum: ["Diario", "Semanal", "Mensual", "Ocasionalmente", "Rara vez/ Nunca"]
              },
              nivelEntrenamientoSupervisor: {
                type: "string",
                title: "¿Cuál es tu nivel de entrenamiento en Supervisor?",
                enum: [
                  "Básico / Autoaprendizaje: Conozco los fundamentos del software, puedo realizar tareas simples o he aprendido principalmente por mi cuenta con tutoriales básicos.",
                  "Intermedio / Usuario Regular: Lo utilizo habitualmente para mis tareas principales, he recibido alguna capacitación básica o tengo experiencia práctica considerable.",
                  "Avanzado / Experto Funcional: Domino la mayoría de las funcionalidades clave y complejas, puedo resolver problemas avanzados y trabajar de forma eficiente.",
                  "Experto / Capacitador o Desarrollador Interno: No solo lo domino, sino que tengo la capacidad de capacitar a otros en su uso, o de desarrollar soluciones y automatizaciones específicas dentro del software."
                ]
              },
              fileUploadSupervisor: {
                type: "string",
                title: "¿Tienes alguna certificación oficial de Supervisor? Adjunta el badge o diploma de tu certificación oficial de Supervisor (si aplica)",
                format: "data-url",
                "ui:widget": "file"
              },
              modulosSupervisor: {
                type: "string",
                title: "¿Qué módulos de Supervisor utilizas en las funciones correspondientes a tu cargo? (Si no conoce los nombres de los módulos, describa las actividades que realiza en el software)",
              },
              modalidadSupervisor: {
                type: "string",
                title: "¿En qué tipo de equipo o modalidad utilizas Supervisor?",
                enum: ["PC", "Maquina Virtual", "Web / SaaS"]
              },
            }
          }
        },
      },
    },
    // Isatis
    {
      if: {
        properties: {
          softwaresUtilizados: {
            contains: { type: "string", const: "Isatis" },
          },
        },
      },
      then: {
        properties: {
          moduloIsatis: {
            type: "object",
            title: "Isatis",
            required: ["frecuenciaUsoIsatis"],
            properties: {
              frecuenciaUsoIsatis: {
                type: "string",
                title: "Para Isatis, por favor indica ¿con qué frecuencia lo utilizas?",
                enum: ["Diario", "Semanal", "Mensual", "Ocasionalmente", "Rara vez/ Nunca"]
              },
              nivelEntrenamientoIsatis: {
                type: "string",
                title: "¿Cuál es tu nivel de entrenamiento en Isatis?",
                enum: [
                  "Básico / Autoaprendizaje: Conozco los fundamentos del software, puedo realizar tareas simples o he aprendido principalmente por mi cuenta con tutoriales básicos.",
                  "Intermedio / Usuario Regular: Lo utilizo habitualmente para mis tareas principales, he recibido alguna capacitación básica o tengo experiencia práctica considerable.",
                  "Avanzado / Experto Funcional: Domino la mayoría de las funcionalidades clave y complejas, puedo resolver problemas avanzados y trabajar de forma eficiente.",
                  "Experto / Capacitador o Desarrollador Interno: No solo lo domino, sino que tengo la capacidad de capacitar a otros en su uso, o de desarrollar soluciones y automatizaciones específicas dentro del software."
                ]
              },
              fileUploadIsatis: {
                type: "string",
                title: "¿Tienes alguna certificación oficial de Isatis? Adjunta el badge o diploma de tu certificación oficial de Isatis (si aplica)",
                format: "data-url",
                "ui:widget": "file"
              },
              modulosIsatis: {
                type: "string",
                title: "¿Qué módulos de Isatis utilizas en las funciones correspondientes a tu cargo? (Si no conoce los nombres de los módulos, describa las actividades que realiza en el software)",
              },
              modalidadIsatis: {
                type: "string",
                title: "¿En qué tipo de equipo o modalidad utilizas Isatis?",
                enum: ["PC", "Maquina Virtual", "Web / SaaS"]
              },
            }
          }
        },
      },
    },
  ],
} as const;

// Custom DescriptionFieldTemplate to render HTML
const DescriptionFieldTemplate = ({ description }) => (
  <div style={{ marginBottom: 16, textAlign: "left"  }}>
    <div dangerouslySetInnerHTML={{ __html: description }} />
  </div>
);

// Your provided UI Schema
const uiSchema = {
  softwaresUtilizados: {
    "ui:widget": "checkboxes",
    "ui:options": {
      inline: false
    }
  },
  moduloMinePlan: {
    "ui:description": "",
    frecuenciaUsoMinePlan: {
      "ui:widget": "radio",
      "ui:options": {
        inline: true
      }
    },
    nivelEntrenamientoMinePlan: {
    //   "ui:widget": "radio",
      "ui:options": {
        inline: false

      }
    },
    modulosMinePlan: {
      "ui:widget": "textarea",
      "ui:options": {
        rows: 3
      }
    },
    modalidadMinePlan: {
      "ui:widget": "radio",
      "ui:options": {
        inline: true
      }
    }
  },
  moduloLeapFrog: {
    "ui:description": "",
    frecuenciaUsoLeapFrog: {
      "ui:widget": "radio",
      "ui:options": {
        inline: true
      }
    },
    modulosLeapFrog: {
      "ui:widget": "textarea",
      "ui:options": {
        rows: 3
      }
    },
    modalidadLeapFrog: {
      "ui:widget": "radio",
      "ui:options": {
        inline: true
      }
    },  
},
moduloCentral: {
  "ui:description": "",
    frecuenciaUsoCentral: {
        "ui:widget": "radio",
        "ui:options": {
        inline: true
        }
    },
    modulosCentral: {
        "ui:widget": "textarea",
        "ui:options": {
        rows: 3
        }
    },
    modalidadCentral: {
        "ui:widget": "radio",
        "ui:options": {
        inline: true
        }
    }
},
moduloStudioRM: {
    "ui:description": "",
        frecuenciaUsoStudioRM: {
        "ui:widget": "radio",
        "ui:options": {
            inline: true
        }
        },
        modulosStudioRM: {
        "ui:widget": "textarea",
        "ui:options": {
            rows: 3
        }
        },
        modalidadStudioRM: {
        "ui:widget": "radio",
        "ui:options": {
            inline: true
        }
        }
    },
moduloSupervisor: {
    "ui:description": "",
        frecuenciaUsoSupervisor: {
        "ui:widget": "radio",
        "ui:options": {
            inline: true
        }
        },
        modulosSupervisor: {
        "ui:widget": "textarea",
        "ui:options": {
            rows: 3
        }
        },
        modalidadSupervisor: {
        "ui:widget": "radio",
        "ui:options": {
            inline: true
        }
        }
    },
moduloIsatis: {
    "ui:description": "",
        frecuenciaUsoIsatis: {
        "ui:widget": "radio",
        "ui:options": {
            inline: true
        }
        },
        modulosIsatis: {
        "ui:widget": "textarea",
        "ui:options": {
            rows: 3
        }
        },
        modalidadIsatis: {
        "ui:widget": "radio",
        "ui:options": {
            inline: true
        }
        }
    }
} as const;

// Your initial form data
const initialFormData = {
  nombreParticipante: "",
  softwaresUtilizados: []
};

function MyConditionalForm() {
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = ({ formData, errors }) => {
    console.log("Data submitted:", formData);
    console.log("Errors:", errors);
    // Here you would typically send formData to your backend
  };

  const handleChange = ({ formData }) => {
    setFormData(formData);
    console.log("Form data changed:", formData);
  };

  const handleError = (errors) => {
    console.log("Errors:", errors);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '2px 2px 10px rgba(0,0,0,0.1)' }}>
      {/* <h1>{schema.title}</h1>
      <p>{schema.description}</p> */}
      <Form
        schema={schema}
        uiSchema={uiSchema}
        formData={formData}
        validator={validator}
        onSubmit={handleSubmit}
        onChange={handleChange}
        onError={handleError}
        templates={{ DescriptionFieldTemplate }}
      />
    </div>
  );
}

export default MyConditionalForm;


