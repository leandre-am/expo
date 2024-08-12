package expo.modules.filesystem.next

import android.net.Uri
import java.io.File

class FileSystemDirectory(path: File) : FileSystemPath(path) {
  fun validatePath() {
// Kept empty for now, but can be used to validate if the path is a valid directory path.
  }

  override fun validateType() {
    if (path.exists() && !path.isDirectory) {
      throw InvalidTypeFolderException()
    }
  }

  override fun exists(): Boolean {
    return path.isDirectory
  }

  fun create() {
    validateType()
    path.mkdir()
  }

  fun listAsRecords(): List<Map<String, Any>> {
    validateType()
    return path.listFiles()?.map {
        mapOf(
          "isDirectory" to it.isDirectory,
          "path" to it.path)
    } ?: emptyList()
  }

  fun asString(): String? {
    val uriString = Uri.fromFile(path).toString()
    return if (uriString.endsWith("/")) uriString else "$uriString/"
  }
}
