export default function generateAccess() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}