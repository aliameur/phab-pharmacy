# Define the base source and destination directories
SOURCE_DIR="../dist/apps/backend"
DEST_DIR="../dist/apps/backend/dist"

# Function to move a directory
move_directory() {
    local src="${SOURCE_DIR}/$1"
    local dest="${DEST_DIR}/$1"

    # Check if source directory exists
    if [ -d "$src" ]; then
        # Ensure the destination parent directory exists
        mkdir -p "$dest"
        # Move the directory
        mv "$src" "$(dirname "$dest")"
        echo "Moved $src to $dest"
    else
        echo "Directory $src does not exist, skipping."
    fi
}

# Move specific directories
move_directory "api"
move_directory "migrations"
move_directory "models"
move_directory "repositories"
move_directory "services"
move_directory "types"
