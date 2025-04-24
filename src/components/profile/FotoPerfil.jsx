import { useState, useRef } from "react";
import {
  ProfilePhotoContainer,
  PhotoPreviewContainer,
  PhotoPreviewImage,
  PhotoUploadLabel,
  HiddenFileInput,
  ProfilePhotoTitle,
  ProfilePhotoDescription,
  ProfilePhotoButton,
} from "./StyledComponentes";
import { updatePhotoUserProfile } from "../../api/users/users";
import { useContext } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import Swal from "sweetalert2";

const FotoPerfil = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const { user, cambiarImagen } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);

      // Crear una URL para previsualizar la imagen
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedFile) {
      setLoading(true);

      try {
        const formData = new FormData();
        formData.append("images", selectedFile);

        console.log("Foto de perfil a enviar:", selectedFile);
        console.log("FormData creado:", formData);

        const response = await updatePhotoUserProfile(user.id, formData);
        console.log("Respuesta del servidor:", response);
        console.log("Estado de la respuesta:", response.data.id);

        if (response) {
          // Actualizar el estado del usuario con la nueva foto de perfil
          cambiarImagen(response.data.urlFoto);

          Swal.fire({
            title: "¡Éxito!",
            text: "Tu foto de perfil ha sido actualizada correctamente",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar",
          });
        } else {
          throw new Error("No se recibió respuesta del servidor");
        }

        // Opcional: Aquí podrías actualizar el estado global del usuario si guarda la foto
      } catch (error) {
        console.error("Error al actualizar la foto de perfil:", error);

        Swal.fire({
          title: "Error",
          text:
            error.message ||
            "No se pudo actualizar la foto de perfil. Por favor, intenta de nuevo.",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "Entendido",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <ProfilePhotoContainer>
      <ProfilePhotoTitle>Foto de Perfil</ProfilePhotoTitle>
      <ProfilePhotoDescription>
        Sube una foto para personalizar tu perfil. Se recomienda una imagen
        cuadrada.
      </ProfilePhotoDescription>

      <PhotoPreviewContainer>
        {previewUrl ? (
          <PhotoPreviewImage src={previewUrl} alt="Vista previa" />
        ) : user.urlFoto ? (
          <PhotoPreviewImage src={user.urlFoto} alt="Vista previa" />
        ) : (
          <i
            className="bi bi-person-circle"
            style={{ fontSize: "5rem", color: "#ccc" }}
          ></i>
        )}
      </PhotoPreviewContainer>

      <form onSubmit={handleSubmit}>
        <PhotoUploadLabel htmlFor="profile-photo-upload">
          <i className="bi bi-cloud-arrow-up me-2"></i>
          Seleccionar Foto
        </PhotoUploadLabel>
        <HiddenFileInput
          id="profile-photo-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
        />

        <div className="d-flex gap-2 justify-content-center mt-3">
          {selectedFile && (
            <>
              <ProfilePhotoButton type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Guardando...
                  </>
                ) : (
                  "Guardar Foto"
                )}
              </ProfilePhotoButton>
              <ProfilePhotoButton
                variant="outline-danger"
                type="button"
                onClick={handleReset}
                disabled={loading}
              >
                Cancelar
              </ProfilePhotoButton>
            </>
          )}
        </div>
      </form>
    </ProfilePhotoContainer>
  );
};

export default FotoPerfil;
