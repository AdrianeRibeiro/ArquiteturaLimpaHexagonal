export default interface Connection {
    query(sql: string, params: any): Promise<any>
}