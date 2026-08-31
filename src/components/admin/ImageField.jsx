import { useRef, useState } from "react"

import { useAuth } from "../../hooks/useAuth"
import { uploadImage } from "../../services/uploadService"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

function ImageField({ id, value, placeholder, required, disabled, onChange }) {
  const { token } = useAuth()
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")

  async function handleFile(event) {
    const file = event.target.files?.[0]
    if (!file) return

    setError("")
    setUploading(true)

    try {
      const { url } = await uploadImage(file, token)
      onChange(url)
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
      if (inputRef.current) {
        inputRef.current.value = ""
      }
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {value && (
        <img
          src={value}
          alt=""
          className="border-line max-h-32 w-fit rounded-lg border object-contain"
        />
      )}

      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden"
        />
        <Button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading || disabled}
          className="bg-surface text-fg border-line border"
        >
          {uploading ? "Enviando..." : "Enviar imagem"}
        </Button>
        {value && (
          <Button
            type="button"
            onClick={() => onChange("")}
            disabled={disabled}
            className="bg-surface text-muted border-line border"
          >
            Remover
          </Button>
        )}

        <Input
          type="url"
          value={value}
          placeholder={placeholder || "ou cole uma URL"}
          required={required}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-48 flex-1"
        />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  )
}

export default ImageField
