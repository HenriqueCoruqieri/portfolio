import { useState } from "react"

import ContactInfo from "../components/ContactInfo"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import {
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  SendIcon,
} from "../components/ui/icons"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import {
  CONTACT_AVAILABILITY,
  CONTACT_CTA,
  CONTACT_FORM_FIELDS,
  CONTACT_HEADER,
  CONTACT_SUCCESS_MESSAGE,
  EMPTY_CONTACT_FORM,
} from "../data/contact"
import { useResource } from "../hooks/useResource"
import { validateContact } from "../lib/contactSchema"
import { createResource } from "../services/resourceService"

function buildInfoItems(profile) {
  return [
    { Icon: MailIcon, title: "Email", info: profile.email },
    { Icon: PhoneIcon, title: "Telefone", info: profile.phone },
    { Icon: MapPinIcon, title: "Localização", info: profile.address },
    {
      Icon: ClockIcon,
      title: CONTACT_AVAILABILITY.title,
      info: CONTACT_AVAILABILITY.info,
    },
  ].filter((item) => item.info)
}

function Contact() {
  const { items, loading } = useResource("profile")
  const [values, setValues] = useState(EMPTY_CONTACT_FORM)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [sendError, setSendError] = useState("")

  const infoItems = buildInfoItems(items[0] ?? {})

  function setValue(name, value) {
    setValues((previous) => ({ ...previous, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setFeedback("")
    setSendError("")

    const { data, errors: fieldErrors } = validateContact(values)
    setErrors(fieldErrors)

    if (!data) return

    setSubmitting(true)

    try {
      await createResource("messages", data)
      setValues(EMPTY_CONTACT_FORM)
      setFeedback(CONTACT_SUCCESS_MESSAGE)
    } catch (err) {
      setSendError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10">
        <h1 className="text-fg text-4xl font-bold tracking-tight">
          {CONTACT_HEADER.title}
        </h1>
        <p className="text-muted mt-2">{CONTACT_HEADER.subtitle}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-[18rem_minmax(0,1fr)]">
        <div className="flex flex-col gap-6">
          {loading && <p className="text-muted text-sm">Carregando...</p>}

          {infoItems.map((item) => (
            <ContactInfo
              key={item.title}
              Icon={item.Icon}
              title={item.title}
              info={item.info}
            />
          ))}
        </div>

        <Card className="p-6">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-5"
          >
            {CONTACT_FORM_FIELDS.map((field) => {
              const id = `contact-${field.name}`
              const error = errors[field.name]

              return (
                <div key={field.name} className="flex flex-col gap-1.5">
                  <label htmlFor={id} className="text-fg text-sm font-medium">
                    {field.label}
                  </label>

                  {field.type === "textarea" ? (
                    <Textarea
                      id={id}
                      rows={5}
                      value={values[field.name]}
                      placeholder={field.placeholder}
                      aria-invalid={Boolean(error)}
                      onChange={(event) =>
                        setValue(field.name, event.target.value)
                      }
                    />
                  ) : (
                    <Input
                      id={id}
                      type={field.type}
                      value={values[field.name]}
                      placeholder={field.placeholder}
                      aria-invalid={Boolean(error)}
                      onChange={(event) =>
                        setValue(field.name, event.target.value)
                      }
                    />
                  )}

                  {error && <p className="text-xs text-red-400">{error}</p>}
                </div>
              )
            })}

            {feedback && <p className="text-sm text-emerald-500">{feedback}</p>}
            {sendError && <p className="text-sm text-red-400">{sendError}</p>}

            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? "Enviando..." : "Enviar mensagem"}
            </Button>
          </form>
        </Card>
      </div>

      <Card className="mt-8 flex-row items-center justify-between gap-6 p-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-fg text-lg font-semibold">{CONTACT_CTA.title}</h2>
          <p className="text-muted max-w-xl text-sm leading-relaxed">
            {CONTACT_CTA.description}
          </p>
        </div>

        <div className="bg-accent/10 text-accent hidden size-20 shrink-0 items-center justify-center rounded-full sm:flex">
          <SendIcon className="size-9" />
        </div>
      </Card>
    </div>
  )
}

export default Contact
